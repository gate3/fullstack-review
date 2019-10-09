const express = require('express');
const router = express.Router();

const mapHelper = require('../helpers/map-objects')
const responseHelper = require('../helpers/response.helper')

const controllers = require('../controllers')

const dbHelper = require('../helpers/db-factory')

/* GET Stored Markers */
router.get('/', async (req, res, next) => {
  try{
    const locations = await controllers.fetchLocations(dbHelper)
    responseHelper.success(res,'', locations)
  }catch(e){
    responseHelper.error(res, e)
  }
});

/* PUT Edit Store Markers */
router.put('/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    const result = await controllers.editLocation(dbHelper, id, req.body)
    responseHelper.success(res, 'Location Edited', result)
  }catch(e){
    responseHelper.error(res, e)
  }
});

/* POST Store Markers */
router.post('/new', async (req, res, next) => {
  try{
    const {address} = req.body
    const geocode = await controllers.geocodeAddress(mapHelper, address)
    await controllers.createLocation(dbHelper, geocode)
    responseHelper.success(res,'', geocode)
  }catch(e){
    responseHelper.error(res, e)
  }
});

/* DELETE Stored Markers */
router.delete('/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    const result = await controllers.deleteLocation(dbHelper, id)
    responseHelper.success(res, result)
  }catch(e){
    responseHelper.error(res, e)
  }
});

module.exports = router;
