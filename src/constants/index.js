export const ERR_MESSAGE = {
  AMOUNT_MUST_BE_POSITIVE: 'The amount must be a positive number.',
  CUSTOM_ID_IS_LONG: 'The custom ID is too long.',
  CUSTOM_ID_IS_SHORT: 'The custom ID is too short.',
  CUSTOM_ID_NOT_STRING: 'Custom ID must be a string.',
  CUSTOM_ID_NOT_VALID: 'The custom ID is not valid.',
  CUSTOM_ID_IS_EXIST: '',
  INSUFFICIENT_FUNDS: 'Insufficient funds to complete the transaction.',
  INTERNAL_ERROR:
    'Internal server error. Contact support if the issue persists.',
  NUMBER_IS_REQUIRED: 'A numeric value is required.',
  NOT_NUMBER: 'The provided value must be a valid number.',
  ROUTE_NOT_FOUND: 'Route unavailable or nonexistent.',
  UPDATE_NOT_VALID: 'The update is not valid.',
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again later.',
  USER_ID_IS_REQUIRED: 'User ID is required.',
  USER_NOT_FOUND: 'The requested user was not found.',
  USER_NOT_STRING: 'User ID must be a string.'
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
