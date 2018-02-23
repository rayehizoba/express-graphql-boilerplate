const database = require('../../config/database');
const dbSeeder = require('./dbSeeder.service');
const environment = require('./env.service');

const dbService = (migrate) => {
  const authenticateDB = () => (
    database
    .authenticate()
  );

  const dropDB = () => (
    database
    .drop()
  );

  const syncDB = () => (
    database
    .sync()
  );

  const successfulDBStart = () => {
    console.info('connection to the database has been established successfully');
    if (environment.isNotProduction) {
      dbSeeder.start();
    }
  };

  const errorDBStart = (err) => (
    console.info('unable to connect to the database:', err)
  );

  const wrongEnvironment = () => {
    console.warn(`only development, staging, test and production are valid NODE_ENV variables but ${environment.name} is specified`);
    return process.exit(1);
  };

  const startMigrateTrue = () => (
    syncDB()
    .then(() => successfulDBStart())
    .catch((err) => errorDBStart(err))
  );

  const startMigrateFalse = () => (
    dropDB()
    .then(() => (
        syncDB()
        .then(() => successfulDBStart())
        .catch((err) => errorDBStart(err))
      )
      .catch((err) => errorDBStart(err)),
    )
  );

  const startDev = () => (
    authenticateDB()
    .then(() => {
      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    })
  );

  const startStage = () => (
    authenticateDB()
    .then(() => {
      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    })
  );

  const startTest = () => (
    authenticateDB()
    .then(() => startMigrateFalse())
  );

  const startProd = () => (
    authenticateDB()
    .then(() => startMigrateFalse())
  );

  const start = () => {
    if (environment.isDevelopment) {
      return startDev();
    }
    if (environment.isStaging) {
      return startStage();
    }
    if (environment.isTesting) {
      return startTest();
    }
    if (environment.isProduction) {
      return startProd();
    }
    return wrongEnvironment();
  };

  return {
    start,
  };
};

module.exports = dbService;