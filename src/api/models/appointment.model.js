const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');
const { paymentStatus, appointmentStatus } = require('../../config/constants');
const { timeSlotSchema } = require('./timeSlot.model');

const appointmentSchema = mongoose.Schema(
  {
    date_reserved: {
      type: Date,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    time_slot: {
      type: timeSlotSchema,
    },
    is_cancel: {
      type: Boolean,
      default: false,
    },
    cancel_remarks: {
      type: String,
    },
    status: {
      type: String,
      enum: [appointmentStatus.pendingApproval, appointmentStatus.upcoming, appointmentStatus.ongoing, appointmentStatus.pendingPayment, appointmentStatus.completed],
      default: appointmentStatus.pendingApproval,
    },
    status_remarks: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: [paymentStatus.success, paymentStatus.pending],
      default: paymentStatus.pending,
    },
    total_price: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

appointmentSchema.plugin(toJSON);
appointmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Appointment', appointmentSchema);
