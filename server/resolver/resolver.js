const { posts, users } = require('../data/static')

const User = require('../models/userModel')
const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

// Ham tra du lieu that su 

const resolvers = {

    Query: {
        posts: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.getAllPost(),
        post: async(parent, { id }, { mongoDataMethods }) => await mongoDataMethods.getPostById(id),

        users: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.getAllUser(),
        user: async(parent, { id }, { mongoDataMethods }) => await mongoDataMethods.getUserById(id),

        comments: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.getAllComments(),
        comment: async(parent, { id }, { mongoDataMethods }) => await mongoDataMethods.getCommentById(id),
    },
    Post: {
        user: async({ user_id }, args, { mongoDataMethods }) => await mongoDataMethods.getUserById(user_id),
        comments: async({ id }, args, { mongoDataMethods }) => await mongoDataMethods.getAllComments({ post_id: id }),
    },
    User: {
        posts: async({ id }, args, { mongoDataMethods }) => await mongoDataMethods.getAllPost({ user_id: id }),
        comments: async({ id }, args, { mongoDataMethods }) => await mongoDataMethods.getAllComments({ user_id: id }),
    },
    Comment: {
        user: async({ user_id }, args, { mongoDataMethods }) => await mongoDataMethods.getUserById(user_id),
        post: async({ post_id }, args, { mongoDataMethods }) => await mongoDataMethods.getPostById(post_id),
        reply: async({ reply_id }, args, { mongoDataMethods }) => await mongoDataMethods.getCommentById(reply_id),
        List: async({ id }, args, { mongoDataMethods }) => await mongoDataMethods.getAllComments({ reply_id: id }),
    },

    // Mutation
    Mutation: {
        createUser: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.createUser(args),
        updateUser: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.updateUser(args),
        deleteUser: async(parent, { id }, { mongoDataMethods }) => await mongoDataMethods.deleteUser(id),

        createPost: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.createPost(args),
        updatePost: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.updatePost(args),
        deletePost: async(parent, { id }, { mongoDataMethods }) => await mongoDataMethods.deletePost(id),

        createComment: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.createComment(args),
        updateComment: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.updateComment(args),
        deleteComment: async(parent, { id }, { mongoDataMethods }) => await mongoDataMethods.deleteComment(id),

    }
}

module.exports = resolvers