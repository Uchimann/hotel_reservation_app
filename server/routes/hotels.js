const {typeByCity, typeByCount, deleteHotel, getAllHotel, getSingleHotel, updateHotel, createHotel} = require('../controllers/hotel.js')
const express = require('express')

const router = express.Router();



    router.get('/typeByCity', typeByCity)
    router.get('/typeByCount',typeByCount)
    router.get('/getSingleHotel/id',getSingleHotel)
    router.get('/getAllHotel',getAllHotel)
    router.post('/createHotel',createHotel)
    router.put('updateHotel/:id',updateHotel)
    router.delete('/deleteHotel/id',deleteHotel)





module.exports = router