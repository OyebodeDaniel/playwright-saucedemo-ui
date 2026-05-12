const users = {
  standard:          { username: 'standard_user',           password: 'secret_sauce' },
  lockedOut:         { username: 'locked_out_user',          password: 'secret_sauce' },
  problem:           { username: 'problem_user',             password: 'secret_sauce' },
  performanceGlitch: { username: 'performance_glitch_user',  password: 'secret_sauce' },
  invalid:           { username: 'invalid_user',             password: 'wrong_password' },
};

const checkout = {
  valid: { firstName: 'Daniel', lastName: 'Oyebode', postalCode: 'LA90001' },
};

const sortOptions = {
  nameAZ:       'az',
  nameZA:       'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
};

module.exports = { users, checkout, sortOptions };
