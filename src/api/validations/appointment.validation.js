const Joi = require('joi');

const createAppointment = {
  body: Joi.object().keys({
    date_reserved: Joi.date(),
    customer: Joi.string().required(),
    service: Joi.string().required(),
    vehicle: Joi.string().required(),
    time_slot: Joi.object({
      start_time: Joi.string().required(),
      end_time: Joi.string().required(),
    }),
    is_cancel: Joi.string(),
    cancel_remarks: Joi.string(),
    status: Joi.string(),
    status_remarks: Joi.string(),
    paymentStatus: Joi.string(),
    total_price: Joi.string(),
  }),
};

const updateAppointment = {
  params: Joi.object().keys({
    appointmentId: Joi.string().required(),
  })
};

const deleteAppointment = {
  params: Joi.object().keys({
    appointmentId: Joi.string().required(),
  })
};

module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
};