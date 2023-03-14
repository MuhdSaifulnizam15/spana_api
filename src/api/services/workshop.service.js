const httpStatus = require('http-status');
const { Workshop, Address } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a workshop
 * @param {Object} userBody
 * @returns {Promise<Workshop>}
 */
const createWorkshop = async (userBody) => {
  if (await Workshop.isNameTaken(userBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Workshop already exist.');
  }
  const address = await Address.create(userBody.address);
  const workshopUserBody = {};
  workshopUserBody.name = userBody.name;
  workshopUserBody.operation_time = userBody.operation_time;
  workshopUserBody.address = address._id;
  const workshop = await Workshop.create(workshopUserBody);
  return workshop;
};

/**
 * Query for workshops
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryWorkshops = async (filter, options) => {
  options.populate = {
    path: 'address',
  };
  const workshops = await Workshop.paginate(filter, options);
  return workshops;
};

/**
 * Get workshop by id
 * @param {ObjectId} id
 * @returns {Promise<Workshop>}
 */
const getWorkshopById = async (id) => {
  return Workshop.findById(id);
};

/**
 * Get address by id
 * @param {ObjectId} id
 * @returns {Promise<Address>}
 */
const getAddressById = async (id) => {
  return Address.findById(id);
};

/**
 * Update workshop by id
 * @param {ObjectId} workshopId
 * @param {Object} updateBody
 * @returns {Promise<Workshop>}
 */
const updateWorkshopById = async (workshopId, updateBody) => {
  const workshop = await getWorkshopById(workshopId);
  if (!workshop) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workshop not found');
  }

  const address = await getAddressById(workshop.address);
  await address.save();
  updateBody.address = address._id;

  Object.assign(workshop, updateBody);
  await workshop.save();
  return workshop;
};

/**
 * Delete workshop by id
 * @param {ObjectId} workshopId
 * @returns {Promise<Workshop>}
 */
const deleteWorkshopById = async (workshopId) => {
  const workshop = await getWorkshopById(workshopId);
  if (!workshop) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workshop not found');
  }

  const address = await getAddressById(workshop.address);
  await address.remove();
  await workshop.remove();
  return workshop;
};

module.exports = {
  createWorkshop,
  queryWorkshops,
  getWorkshopById,
  updateWorkshopById,
  deleteWorkshopById,
};
