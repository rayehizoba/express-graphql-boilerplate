const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const tableName = 'posts';

const Post = sequelize.define('Post', {
  post: {
    type: Sequelize.STRING,
  },
}, { tableName });

module.exports = Post;