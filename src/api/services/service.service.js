const httpStatus = require('http-status');
const { Service } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a service
 * @param {Object} userBody
 * @returns {Promise<Service>}
 */
const createService = async (userBody) => {
  const service = await Service.create(userBody);
  return service;
};

/**
 * Query for services
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryServices = async (filter, options) => {
  options.populate = {
    path: 'workshop',
  };
  const services = await Service.paginate(filter, options);
  return services;
};

/**
 * Get service by id
 * @param {ObjectId} id
 * @returns {Promise<Service>}
 */
const getServiceById = async (id) => {
  return Service.findById(id);
};

/**
 * Update service by id
 * @param {ObjectId} serviceId
 * @param {Object} updateBody
 * @returns {Promise<Service>}
 */
const updateServiceById = async (serviceId, updateBody) => {
  const service = await getServiceById(serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  Object.assign(service, updateBody);
  await service.save();
  return service;
};

/**
 * Delete service by id
 * @param {ObjectId} serviceId
 * @returns {Promise<Service>}
 */
const deleteServiceById = async (serviceId) => {
  const service = await getServiceById(serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  await service.remove();
  return service;
};

module.exports = {
  createService,
  queryServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
