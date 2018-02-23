const Sequelize = require('sequelize');
const bcryptSevice = require('../../services/bcrypt.service');

const sequelize = require('../../../config/database');
const Post = require('../Post/Post');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptSevice.password(user); // eslint-disable-line no-param-reassign
  },
};

const instanceMethods = {
  toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
}, { hooks, instanceMethods, tableName });

User.hasMany(Post, { as: 'posts' });

module.exports = User;
