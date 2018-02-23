// environment: development, testing, production
const environment = process.env.NODE_ENV;
const isProduction = environment === 'production';
const isNotProduction = environment !== 'production';
const isDevelopment = environment === 'development';
const isNotDevelopment = environment !== 'development';
const isTesting = environment === 'testing';
const isNotTesting = environment !== 'testing';
const isStaging = environment === 'staging';
const isNotStaging = environment !== 'staging';
const isNotValid = environment !== 'production' &&
  environment !== 'development' &&
  environment !== 'testing';
const name = environment;

module.exports = {
  isProduction,
  isNotProduction,
  isDevelopment,
  isNotDevelopment,
  isTesting,
  isNotTesting,
  isStaging,
  isNotStaging,
  isNotValid,
  name,
};
