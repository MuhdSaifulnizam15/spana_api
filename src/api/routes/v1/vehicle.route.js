const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { vehicleValidation } = require('../../validations')
const { vehicleController} = require('../../controllers');

const router = express.Router();

router.post('/', auth('manageVehicles'), validate(vehicleValidation.createVehicle), vehicleController.createVehicle);
router.get('/', auth('getVehicles'), validate(vehicleValidation.getVehicles), vehicleController.getVehicles);
router.get('/:vehicleId', auth('getVehicles'), validate(vehicleValidation.getVehicle), vehicleController.getVehicle);
router.post('/update/:vehicleId', auth('manageVehicles'), validate(vehicleValidation.updateVehicle), vehicleController.updateVehicle);
router.post('/delete/:vehicleId', auth('manageVehicles'), validate(vehicleValidation.deleteVehicle), vehicleController.deleteVehicle);

module.exports = router;