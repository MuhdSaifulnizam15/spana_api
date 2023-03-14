const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');
const { serviceStatus } = require('../../config/constants');

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  workshop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workshop',
  },
  status: {
    type: String,
    enum: [serviceStatus.available, serviceStatus.unavailable, serviceStatus.limited],
    default: serviceStatus.unavailable,
  },
  status_remarks: {
    type: String,
  },
  price: {
    type: String,
  },
  price_remarks: {
    type: String,
  },
  image_url: {
    type: String,
  },
  hourly_time_slot: {
    type: String,
    default: 1
  },
  hourly_time_slot_limit: {
    type: String,
    default: 1
  },
});

serviceSchema.plugin(toJSON);
serviceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Service', serviceSchema);
