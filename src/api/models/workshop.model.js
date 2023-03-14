const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');
const { operationHourSchema } = require('./operationHour.model');

const workshopSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
  operation_time: [operationHourSchema],
});

workshopSchema.plugin(toJSON);
workshopSchema.plugin(mongoosePaginate);

workshopSchema.statics.isNameTaken = async function (name, excludeWorkshopId) {
  const city = await this.findOne({ name, _id: { $ne: excludeWorkshopId } });
  return !!city;
};

module.exports = mongoose.model('Workshop', workshopSchema);
