const priority = {
  low: 'LOW',
  medium: 'MEDIUM',
  high: 'HIGH',
};

const paymentStatus = {
  success: 'SUCCESS',
  pending: 'PENDING',
}

const paymentMethod = {
  onlineTransfer: 'ONLINE TRANSFER',
  cash: 'CASH',
  cheque: 'CHEQUE',
  debitCard: 'DEBIT CARD',
  creditCard: 'CREDIT CARD',
}

const operationHourStatus = {
  open: 'OPEN',
  close: 'CLOSED',
  break: 'BREAK',
}

const serviceStatus = {
  available: 'AVAILABLE',
  unavailable: 'UNAVAILABLE',
  limited: 'LIMITED',
}

const appointmentStatus = {
  pendingApproval: 'PENDING APPROVAL',
  upcoming: 'UPCOMING',
  ongoing: 'ONGOING',
  pendingPayment: 'PENDING FOR PAYMENT',
  completed: 'COMPLETED',
}

module.exports = {
  priority,
  paymentStatus,
  paymentMethod,
  operationHourStatus,
  serviceStatus,
  appointmentStatus,
};