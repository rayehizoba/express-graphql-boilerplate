const faker = require('faker');
const User = require('../models/User/User');

const generateUsers = (count = 3) => {
  for (let i = 0; i < count; i++) {
    User.create({
      username: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
}

module.exports = {
  start: () => {
    console.info('[dbSeeder.service] seeding the database with fake data')
    generateUsers();
  }
};