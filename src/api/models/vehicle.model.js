const mongoose = require('mongoose');
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const jwt = require('jsonwebtoken');
const { toJSON } = require('./plugins');
const config = require('../../config/config');

const vehicleSchema = mongoose.Schema({
  model: {
      type: String,
      required: true,
  },
  variant: {
      type: String,
  },
  brand: {
      type: String,
      required: true,
  },
  year: {
      type: String,
      default: new Date().getFullYear()
  },
  color: {
      type: String,
  },
  image: {
    type: String
  }
}, {
  timestamps: true,
});

// add plugin that converts mongoose to json
vehicleSchema.plugin(toJSON);
vehicleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Vehicle', vehicleSchema);