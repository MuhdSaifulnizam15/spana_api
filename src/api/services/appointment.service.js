const httpStatus = require('http-status');
const { Appointment, Address } = require('../models');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service');
const { getServiceById } = require('./service.service');
const { getVehicleById } = require('./vehicle.service');

/**
 * Create a appointment
 * @param {Object} userBody
 * @returns {Promise<Appointment>}
 */
const createAppointment = async (userBody) => {
  const customer = await getUserById(userBody.customer);
  if (!customer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'customer not found.');
  }
  userBody.customer = customer._id;

  const service = await getServiceById(userBody.service);
  if (!service) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'service not found.');
  }
  userBody.service = service._id;

  const vehicle = await getVehicleById(userBody.vehicle);
  if (!vehicle) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'vehicle not found.');
  }
  userBody.vehicle = vehicle._id;

  const appointment = await Appointment.create(userBody);
  return appointment;
};

/**
 * Query for appointments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAppointments = async (filter, options) => {
  console.log('filter', filter);
  console.log('options', options);
  options.populate = ['customer', 'service', 'vehicle'];
  const appointments = await Appointment.paginate(filter, options);
  return appointments;
};

/**
 * Get appointment by id
 * @param {ObjectId} id
 * @returns {Promise<Appointment>}
 */
const getAppointmentById = async (id) => {
  const app = Appointment.findById(id);
  return app.populate(['customer', 'service', 'vehicle']);
};

/**
 * Update appointment by id
 * @param {ObjectId} appointmentId
 * @param {Object} updateBody
 * @returns {Promise<Appointment>}
 */
const updateAppointmentById = async (appointmentId, updateBody) => {
  const appointment = await getAppointmentById(appointmentId);
  if (!appointment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
  }

  Object.assign(appointment, updateBody);
  await appointment.save();
  return appointment;
};

/**
 * Delete appointment by id
 * @param {ObjectId} appointmentId
 * @returns {Promise<Appointment>}
 */
const deleteAppointmentById = async (appointmentId) => {
  const appointment = await getAppointmentById(appointmentId);
  if (!appointment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
  }

  await appointment.remove();
  return appointment;
};

module.exports = {
  createAppointment,
  queryAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
};
