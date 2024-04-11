
const countryattractions = async (req,res)=>{
    const countryname = req.params.countryname

    const axios = require('axios')

    const url = 'https://places.googleapis.com/v1/places:searchText';
    const apiKey = 'AIzaSyAtdCqswc44NSRDc1zkbMdKHf_XaJNDEwE';
    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.addressComponents,places.priceLevel,places.photos'
    };
    const bodyData = {
        "textQuery": `Tourist, Vacation spots in ${countryname}`
    };

    try {
        const response = await axios.post(url, bodyData, { headers });
        console.log('Data:', response.data);
        var places = response.data
        var photourls=[]
        places.places.forEach(place => {
            if(place.photos && place.photos[0] != undefined){
                console.log(place.photos[0])
                var photoname = place.photos[0].name
                var maxWidthPx = (place.photos[0].widthPx>4000?4000:place.photos[0].widthPx)
                var maxHeightPx = (place.photos[0].heightPx>4000?4000:place.photos[0].heightPx)
                var photourl = `https://places.googleapis.com/v1/${photoname}/media?maxHeightPx=${maxHeightPx}&maxWidthPx=${maxWidthPx}&key=${apiKey}&skipHttpRedirect=true`
                photourls.push({photourl:photourl, place:place})
            }
        });

        const axiosPromises = photourls.map(photourl => 
        axios.get(photourl.photourl));
        // Wait for all promises to resolve using Promise.all
        const responses = await Promise.all(axiosPromises);

        // Extract and process data from each response
        const responseData = responses.map(response => response.data);
        console.log('Response Data:', responseData);
        var _places = places
        _places.places = photourls

        _places.places.forEach((place, ind) => {
            place.photos = responseData[ind]
        });
        res.render('pages/countryattractions', _places)
    } catch (error) {
        console.error('Error:', error.response.data);
    }
}

module.exports = {
    countryattractions
}