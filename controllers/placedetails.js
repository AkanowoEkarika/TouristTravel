
const placedetails = async (req,res)=>{
    const axios = require('axios')

    const placeId = req.params.placeId

    const url = `https://places.googleapis.com/v1/places/${placeId}`
    const apiKey = 'AIzaSyAtdCqswc44NSRDc1zkbMdKHf_XaJNDEwE';
    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'displayName,location,addressComponents,adrFormatAddress,formattedAddress,priceLevel,photos'
    };

    try {
        const response = await axios.get(url, { headers });
        console.log('Data:', response.data);
        var place = response.data
        var photoname = place.photos[0].name
        var maxWidthPx = place.photos[0].widthPx>4000?4000:place.photos[0].widthPx
        var maxHeightPx = place.photos[0].heightPx>4000?4000:place.photos[0].heightPx
        var photourl = `https://places.googleapis.com/v1/${photoname}/media?maxHeightPx=${maxHeightPx}&maxWidthPx=${maxWidthPx}&key=${apiKey}&skipHttpRedirect=true`

        var photoresponse = await axios.get(photourl)
        
        var photoresponsedata = photoresponse.data
        var _place = place
        _place.photos = photoresponsedata

        var acl = (_place.addressComponents && _place.addressComponents.length-1) || 0

        const newsapikey = '78d6984f17434b62b7cb29da819afe09'
        const newsurl = `https://newsapi.org/v2/top-headlines?country=${_place.addressComponents[acl] && _place.addressComponents[acl].shortText.toLowerCase()}&apiKey=${newsapikey}&sortBy=popularity`
        var newsresponse = await axios.get(newsurl)
        var al = (newsresponse.data.articles && newsresponse.data.articles.length-1) || 0

        _place.news = (newsresponse.data.articles[al] && newsresponse.data.articles[al].content) || "No news for this place found"

        res.render('pages/placedetails', _place)

    } catch (error) {
        console.error('Error:', error.response.data);
    }
}

module.exports = {
    placedetails
}