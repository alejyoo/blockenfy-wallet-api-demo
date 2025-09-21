export const ERR_MESSAGE = {
  INTERNAL_ERROR:
    'Internal server error. Contact support if the issue persists.',
  NOT_NUMBER: 'The provided value must be a valid number.',
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again later.',
  USER_ID_IS_REQUIRED: 'User ID is required.',
  USER_NOT_FOUND: 'The requested user was not found.',
  USER_NOT_STRING: 'User ID must be a string.',
  NUMBER_IS_REQUIRED: 'A numeric value is required.',
  ROUTE_NOT_FOUND: 'route unavailable or nonexistent.'
}

export const SUCC_MESSAGE = {
  CREATE_USER: 'User created successfully.',
  GET_BALANCE: 'Balance retrieved successfully.',
  GET_HISTORY: 'Transaction history retrieved successfully.',
  LIST_USERS: 'Users listed successfully.',
  RECHARGE: 'Recharge completed successfully.',
  TRANSACTION: 'Transaction completed successfully.'
}

export const DEFAULTS = {
  CURRENCY: 'USD',
  INITIAL_BALANCE: 0
}

export const TYPES = {
  RECHARGE: 'recharge',
  TRANSFER: {
    SENT: 'transfer_sent',
    RECEIVED: 'transfer_received'
  }
}

export const DESCRIPTION_TYPES = {
  RECHARGE: 'Recharge completed successfully',
  TRANSFER: {
    SENT: 'Transfer sent successfully',
    RECEIVED: 'Transfer received successfully'
  }
}
