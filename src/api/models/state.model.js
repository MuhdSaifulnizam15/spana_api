const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const stateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});

stateSchema.plugin(toJSON);
stateSchema.plugin(mongoosePaginate);

stateSchema.statics.isNameTaken = async function (name, excludeStateId) {
  const state = await this.findOne({ name, _id: { $ne: excludeStateId } });
  return !!state;
};

module.exports = mongoose.model('State', stateSchema);