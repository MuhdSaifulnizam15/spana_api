const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { workshopService } = require('../services');

const createWorkshop = catchAsync(async (req, res) => {
  const workshop = await workshopService.createWorkshop(req.body);
  res.status(httpStatus.CREATED).send({ status: true, code: '0000', workshop });
});

const getWorkshops = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'populate', 'limit', 'page']);
  const result = await workshopService.queryWorkshops(filter, options);
  res.send({ status: true, code: '0000', result });
});

const getWorkshop = catchAsync(async (req, res) => {
  const workshop = await workshopService.getWorkshopById(req.params.workshopId);
  if (!workshop) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workshop not found');
  }
  res.send({ status: true, code: '0000', workshop });
});

const updateWorkshop = catchAsync(async (req, res) => {
  const workshop = await workshopService.updateWorkshopById(req.params.workshopId, req.body);
  res.send({ status: true, code: '0000', workshop });
});

const deleteWorkshop = catchAsync(async (req, res) => {
  await workshopService.deleteWorkshopById(req.params.workshopId);
  res.send({ status: true, code: '0000' });
});

module.exports = {
  createWorkshop,
  getWorkshops,
  getWorkshop,
  updateWorkshop,
  deleteWorkshop,
};