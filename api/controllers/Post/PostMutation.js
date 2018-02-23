const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const PostType = require('../../models/Post/PostType');
const Post = require('../../models/Post/Post');

const createPost = {
  type: PostType,
  description: 'The mutation that allows you to create a new Post',
  args: {
    UserId: {
      name: 'UserId',
      type: new GraphQLNonNull(GraphQLInt),
    },
    post: {
      name: 'post',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (value, { UserId, post }) => (
    Post.create({
      UserId,
      post,
    })
  ),
};

const updatePost = {
  type: PostType,
  description: 'The mutation that allows you to update an existing Post by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    UserId: {
      name: 'UserId',
      type: new GraphQLNonNull(GraphQLInt),
    },
    post: {
      name: 'post',
      type: GraphQLString,
    },
  },
  resolve: (value, { id, UserId, post }) => (
    Post
    .findById(id)
    .then((foundPost) => {
      if (!foundPost) {
        return 'User not found';
      }

      const thisUserid = UserId !== undefined ? UserId : foundPost.userid;
      const thisPost = post !== undefined ? post : foundPost.post;

      return foundPost.update({
        UserId: thisUserid,
        post: thisPost,
      });
    })
  ),
};

const deletePost = {
  type: PostType,
  description: 'The mutation that allows you to delete a existing Post by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (value, { id }) => (
    Post
    .delete()
    .where({
      id,
    })
  ),
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
};
