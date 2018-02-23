const faker = require('faker');
const User = require('../models/User/User');
const Post = require('../models/Post/Post');

const genetatePosts = (id, count = 3) => {
  for (let i = 0; i < count; i + 1) {
    Post.create({
      UserId: id,
      post: faker.lorem.paragraph,
    });
  }
};

const generateUsers = (count = 3) => {
  for (let i = 0; i < count; i + 1) {
    User.create({
      username: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).then((newUser) => {
      genetatePosts(newUser.id);
    });
  }
};

module.exports = {
  start: () => {
    console.info('[dbSeeder.service] seeding the database with fake data');
    generateUsers();
  },
};
