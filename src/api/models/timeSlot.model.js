const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const timeSlotSchema = mongoose.Schema({
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
});

timeSlotSchema.plugin(toJSON);

module.exports = { timeSlotSchema };
