const Joi = require('joi');

const createVehicle = {
  body: Joi.object().keys({
    model: Joi.string().required(),
    variant: Joi.string(),
    brand: Joi.string().required(),
    year: Joi.string(),
    color: Joi.string(),
    image: Joi.string(),
    plate_num: Joi.string().required(),
    rim_size: Joi.string(),
    tyre_size: Joi.string(),
    cc: Joi.string(),
    mileage: Joi.string(),
  }),
};

const updateVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    model: Joi.string(),
    variant: Joi.string(),
    brand: Joi.string(),
    year: Joi.string(),
    color: Joi.string(),
    image: Joi.string(),
    plate_num: Joi.string(),
    rim_size: Joi.string(),
    tyre_size: Joi.string(),
    cc: Joi.string(),
    mileage: Joi.string(),
  })
};

const deleteVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.string().required(),
  })
};

module.exports = {
  createVehicle,
  updateVehicle,
  deleteVehicle,
};