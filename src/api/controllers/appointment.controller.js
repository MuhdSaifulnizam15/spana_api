const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { appointmentService } = require('../services');

const createAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.createAppointment(req.body);
  res.status(httpStatus.CREATED).send({ status: true, code: '0000', appointment });
});

const getAppointments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'customer', 'vehicle', 'service', 'status', 'is_cancel', 'paymentStatus', 'date_reserved']);
  const options = pick(req.query, ['sortBy', 'populate', 'limit', 'page']);
  const result = await appointmentService.queryAppointments(filter, options);
  res.send({ status: true, code: '0000', result });
});

const getAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.getAppointmentById(req.params.appointmentId);
  if (!appointment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
  }
  res.send({ status: true, code: '0000', appointment });
});

const updateAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.updateAppointmentById(req.params.appointmentId, req.body);
  res.send({ status: true, code: '0000', appointment });
});

const deleteAppointment = catchAsync(async (req, res) => {
  await appointmentService.deleteAppointmentById(req.params.appointmentId);
  res.send({ status: true, code: '0000' });
});

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
};