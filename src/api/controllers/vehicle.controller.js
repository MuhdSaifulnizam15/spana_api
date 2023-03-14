const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { vehicleService } = require('../services');

const createVehicle = catchAsync(async (req, res) => {
  const vehicle = await vehicleService.createVehicle(req.body);
  res.status(httpStatus.CREATED).send({ status: true, code: '0000', vehicle });
});

const getVehicles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'programme_module', 'batch', 'is_active']);
  const options = pick(req.query, ['sortBy', 'populate', 'limit', 'page']);
  const result = await vehicleService.queryVehicles(filter, options);
  res.send({ status: true, code: '0000', result });
});

const getVehicle = catchAsync(async (req, res) => {
  const vehicle = await vehicleService.getVehicleById(req.params.vehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }
  res.send({ status: true, code: '0000', vehicle });
});

const updateVehicle = catchAsync(async (req, res) => {
  const vehicle = await vehicleService.updateVehicleById(req.params.vehicleId, req.body);
  res.send({ status: true, code: '0000', vehicle });
});

const deleteVehicle = catchAsync(async (req, res) => {
  await vehicleService.deleteVehicleById(req.params.vehicleId);
  res.send({ status: true, code: '0000' });
});

module.exports = {
  createVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};