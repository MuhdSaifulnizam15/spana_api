const Joi = require('joi');

const createService = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    workshop: Joi.string(),
    status: Joi.string(),
    status_remarks: Joi.string(),
    price: Joi.string(),
    price_remarks: Joi.string(),
    image_url: Joi.string(),
  }),
};

const updateService = {
  params: Joi.object().keys({
    serviceId: Joi.string().required(),
  })
};

const deleteService = {
  params: Joi.object().keys({
    serviceId: Joi.string().required(),
  })
};

module.exports = {
  createService,
  updateService,
  deleteService,
};