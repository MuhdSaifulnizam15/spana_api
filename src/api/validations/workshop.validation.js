const Joi = require('joi');

const createWorkshop = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.object({
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      postcode: Joi.string().required(),
      office_no: Joi.string(),
    }),
    operation_time: Joi.array().items(
      Joi.object({
        operation_day: Joi.string(),
        operation_time: Joi.string(),
        type: Joi.string().required(),
      })
    ),
  }),
};

const updateWorkshop = {
  params: Joi.object().keys({
    workshopId: Joi.string().required(),
  })
};

const deleteWorkshop = {
  params: Joi.object().keys({
    workshopId: Joi.string().required(),
  })
};

module.exports = {
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
};