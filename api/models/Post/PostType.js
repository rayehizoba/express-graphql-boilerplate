const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a User Post',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (post) => post.id,
    },
    UserId: {
      type: GraphQLInt,
      resolve: (post) => post.UserId,
    },
    post: {
      type: GraphQLString,
      resolve: (post) => post.post,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (post) => post.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (post) => post.createdAt,
    },
  }),
});

module.exports = PostType;
