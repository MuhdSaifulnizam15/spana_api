const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { workshopValidation } = require('../../validations');
const { workshopController } = require('../../controllers');

const router = express.Router();

router.post(
  '/',
  auth('manageWorkshops'),
  validate(workshopValidation.createWorkshop),
  workshopController.createWorkshop
);
router.get(
  '/',
  auth('getWorkshops'),
  validate(workshopValidation.getWorkshops),
  workshopController.getWorkshops
);
router.get(
  '/:workshopId',
  auth('getWorkshop'),
  validate(workshopValidation.getWorkshop),
  workshopController.getWorkshop
);
router.post(
  '/update/:workshopId',
  auth('manageWorkshops'),
  validate(workshopValidation.updateWorkshop),
  workshopController.updateWorkshop
);
router.post(
  '/delete/:workshopId',
  auth('manageWorkshops'),
  validate(workshopValidation.deleteWorkshop),
  workshopController.deleteWorkshop
);

module.exports = router;
