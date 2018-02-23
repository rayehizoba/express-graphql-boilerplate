const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const PostType = require('../../models/Post/PostType');
const Post = require('../../models/Post/Post');

const postQuery = {
  type: new GraphQLList(PostType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    UserId: {
      name: 'UserId',
      type: GraphQLInt,
    },
    note: {
      name: 'note',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: (user, args) => Post.findAll({ where: args }),
};

module.exports = postQuery;