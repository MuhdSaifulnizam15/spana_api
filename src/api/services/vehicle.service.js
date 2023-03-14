const httpStatus = require('http-status');
const { Vehicle } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a vehicle
 * @param {Object} userBody
 * @returns {Promise<Vehicle>}
 */
const createVehicle = async (userBody) => {
  const vehicle = await Vehicle.create(userBody);
  return vehicle;
};

/**
   * Query for vehicles
   * @param {Object} filter - Mongo filter
   * @param {Object} options - Query options
   * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
const queryVehicles = async (filter, options) => {
  const vehicles = await Vehicle.paginate(filter, options);
  return vehicles;
};

/**
   * Get vehicle by id
   * @param {ObjectId} id
   * @returns {Promise<Vehicle>}
*/
const getVehicleById = async (id) => {
  return Vehicle.findById(id);
};

/**
   * Update vehicle by id
   * @param {ObjectId} vehicleId
   * @param {Object} updateBody
   * @returns {Promise<Vehicle>}
   */
const updateVehicleById = async (vehicleId, updateBody) => {
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }
  Object.assign(vehicle, updateBody);
  await vehicle.save();
  return vehicle;
};

/**
 * Delete vehicle by id
 * @param {ObjectId} vehicleId
 * @returns {Promise<Vehicle>}
 */
const deleteVehicleById = async (vehicleId) => {
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }
  await vehicle.remove();
  return vehicle;
};

module.exports = {
  createVehicle,
  queryVehicles,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById,
};