const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { appointmentValidation } = require('../../validations');
const { appointmentController } = require('../../controllers');

const router = express.Router();

router.post(
  '/',
  auth('manageAppointments'),
  validate(appointmentValidation.createAppointment),
  appointmentController.createAppointment
);
router.get(
  '/',
  auth('getAppointments'),
  validate(appointmentValidation.getAppointments),
  appointmentController.getAppointments
);
router.get(
  '/:appointmentId',
  auth('getAppointment'),
  validate(appointmentValidation.getAppointment),
  appointmentController.getAppointment
);
router.post(
  '/update/:appointmentId',
  auth('manageAppointments'),
  validate(appointmentValidation.updateAppointment),
  appointmentController.updateAppointment
);
router.post(
  '/delete/:appointmentId',
  auth('manageAppointments'),
  validate(appointmentValidation.deleteAppointment),
  appointmentController.deleteAppointment
);

module.exports = router;
