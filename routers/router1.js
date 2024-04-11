const express = require('express')

const {
    homepage
 } = require('../controllers/homepage')

 
 const {
    countryattractions
 } = require('../controllers/countryattractions')

 const {
    placedetails
 } = require('../controllers/placedetails')

 const router1 = express.Router()
 const router2 = express.Router()
 const router3 = express.Router()

router1.get('/homepage', homepage)
router2.get('/country-attractions/:countryname', countryattractions)
router3.get('/place-details/:placeId', placedetails)

module.exports = {
    router1, router2, router3
};