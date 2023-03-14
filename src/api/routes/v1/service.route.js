const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { serviceValidation } = require('../../validations');
const { serviceController } = require('../../controllers');

const router = express.Router();

router.post(
  '/',
  auth('manageServices'),
  validate(serviceValidation.createService),
  serviceController.createService
);
router.get(
  '/',
  auth('getServices'),
  validate(serviceValidation.getServices),
  serviceController.getServices
);
router.get(
  '/:serviceId',
  auth('getService'),
  validate(serviceValidation.getService),
  serviceController.getService
);
router.post(
  '/update/:serviceId',
  auth('manageServices'),
  validate(serviceValidation.updateService),
  serviceController.updateService
);
router.post(
  '/delete/:serviceId',
  auth('manageServices'),
  validate(serviceValidation.deleteService),
  serviceController.deleteService
);

module.exports = router;
