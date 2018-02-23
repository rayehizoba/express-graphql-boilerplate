const faker = require('faker');
const User = require('../models/User/User');
const Post = require('../models/Post/Post');

const genetatePosts = async (id, count = 3) => {
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
      genetatePosts(newUser.id);
      return null;
    });
  }
};

module.exports = {
  start: async () => {
    console.info('[dbSeeder.service] seeding the database with fake data');
    await generateUsers();
    console.info('[dbSeeder.service] done seeding the database with fake data');
  },
};
