const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { serviceService } = require('../services');

const createService = catchAsync(async (req, res) => {
  const service = await serviceService.createService(req.body);
  res.status(httpStatus.CREATED).send({ status: true, code: '0000', service });
});

const getServices = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'workshop', 'status']);
  const options = pick(req.query, ['sortBy', 'populate', 'limit', 'page']);
  const result = await serviceService.queryServices(filter, options);
  res.send({ status: true, code: '0000', result });
});

const getService = catchAsync(async (req, res) => {
  const service = await serviceService.getServiceById(req.params.serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  res.send({ status: true, code: '0000', service });
});

const updateService = catchAsync(async (req, res) => {
  const service = await serviceService.updateServiceById(req.params.serviceId, req.body);
  res.send({ status: true, code: '0000', service });
});

const deleteService = catchAsync(async (req, res) => {
  await serviceService.deleteServiceById(req.params.serviceId);
  res.send({ status: true, code: '0000' });
});

module.exports = {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
};