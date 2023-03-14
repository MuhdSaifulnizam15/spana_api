const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { operationHourStatus } = require('../../config/constants');

const operationHourSchema = mongoose.Schema({
  operation_day: {
    type: String,
  },
  operation_time: {
    type: String,
  },
  type: {
    type: String,
    enum: [
      operationHourStatus.open,
      operationHourStatus.close,
      operationHourStatus.break,
    ],
    required: true,
  },
});

operationHourSchema.plugin(toJSON);

module.exports = { operationHourSchema };
