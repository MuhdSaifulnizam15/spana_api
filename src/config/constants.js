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

module.exports = {
  priority,
  paymentStatus,
  paymentMethod,
  operationHourStatus,
};