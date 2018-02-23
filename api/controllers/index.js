const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const userQuery = require('./User/UserQuery');
const {
  updateUser,
  deleteUser,
} = require('./User/UserMutation');
const postQuery = require('./Post/PostQuery');
const {
  createPost,
  updatePost,
  deletePost,
} = require('./Post/PostMutation');

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    user: userQuery,
    post: postQuery,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
  fields: () => ({
    updateUser,
    deleteUser,
    createPost,
    updatePost,
    deletePost,
  }),
});

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = Schema;