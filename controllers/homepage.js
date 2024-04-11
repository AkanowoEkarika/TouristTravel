
const homepage = async (req,res)=>{
    const axios = require('axios')

    const countriesurl = 'https://restcountries.com/v3.1/all'
    try{
        const countriesresponse = await axios.get(countriesurl);
        console.log('Data:', countriesresponse.data);
        var countriesarray = countriesresponse.data
        countriesarray.sort((a, b) => {
            // Convert names to lowercase for case-insensitive sorting
            const nameA = a.name.common.toLowerCase();
            const nameB = b.name.common.toLowerCase();
        
            // Compare the names
            if (nameA < nameB) {
                return -1; // Name 'a' comes before name 'b'
            }
            if (nameA > nameB) {
                return 1; // Name 'a' comes after name 'b'
            }
            return 0; // Names are equal
        })
        var countries = {countries: countriesarray}

        res.render('pages/homepage', countries)
    
    }
    catch (error) {
        console.error('Error:', error.response.data);
    }

}

module.exports = {
    homepage
}