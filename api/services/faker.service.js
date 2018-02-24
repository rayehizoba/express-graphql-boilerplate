const faker = require('faker');
const User = require('../models/User/User');
const Post = require('../models/Post/Post');

const generatePosts = async (id, count = 3) => {
  for (let i = 0; i < count; i += 1) {
    await Post.create({
      UserId: id,
      post: faker.lorem.paragraph(),
    }).then(() => null);
  }
};

const generateUsers = async (count = 3) => {
  for (let i = 0; i < count; i += 1) {
    await User.create({
      username: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).then((newUser) => {
      generatePosts(newUser.id);
      return null;
    });
  }
};

module.exports = {
  start: () => {
    console.info('[faker.service] seeding the database with fake data');
    generateUsers();
    console.info('[faker.service] done seeding the database with fake data');
  },
};
