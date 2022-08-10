const { posts, users } = require('../data/static')

const User = require('../models/userModel')
const Post = require('../models/postModel')

// Ham tra du lieu that su 

const resolvers = {
    // Query
    Query: {
        posts: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.getAllPost(),
        post: async(parent, { id }, { mongoDataMethods }) => await mongoDataMethods.getPostById(id),
        users: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.getAllUser(),
        user: async(parent, { id }, { mongoDataMethods }) => await mongoDataMethods.getUserById(id),
    },
    Post: {
        user: async({ user_id }, args, { mongoDataMethods }) => await mongoDataMethods.getUserById(user_id),
    },
    User: {
        posts: async({ id }, args, { mongoDataMethods }) => await mongoDataMethods.getAllPost({ user_id: id }),
    },

    // Mutation
    Mutation: {
        createUser: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.createUser(args),
        updateUser: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.updateUser(args),
        deleteUser: async(parent, { id }, { mongoDataMethods }) => await mongoDataMethods.deleteUser(id),

        createPost: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.createPost(args),
        updatePost: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.updatePost(args),
        deletePost: async(parent, { id }, { mongoDataMethods }) => await mongoDataMethods.deletePost(id),
    }
}

module.exports = resolvers