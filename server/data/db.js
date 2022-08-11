const User = require('../models/userModel')
const Post = require('../models/postModel')

// Ctrl

const mongoDataMethods = {

    //Posts
    getAllPost: async(condition = null) => condition === null ? await Post.find() : await Post.find(condition),
    getPostById: async(id) => await Post.findById(id),
    createPost: async(args) => {
        const post = await Post.find({ title: args.title })

        if (!post) {
            const newPost = new Post(args);
            return await newPost.save();
        } else {
            const temp = { id: -1 }
            return temp
        }

    },
    updatePost: async(args) => {
        const { id, title, description, user_id } = args
        const post = await Post.findByIdAndUpdate(args.id, { id, title, description, user_id }, { new: true });
        if (post) return post
        else return null
    },
    deletePost: async(id) => {
        const post = await Post.findByIdAndDelete(id);
        if (post) return true
        else return false
    },


    //Users
    getAllUser: async() => await User.find(),
    getUserById: async(id) => await User.findById(id),
    createUser: async(args) => {
        const user = await User.find({ email: args.email })

        if (!user) {
            const newUser = new User(args);
            return await newUser.save()
        } else {
            const temp = { id: -1 }
            return temp
        }
    },
    updateUser: async(args) => {
        const { id, fullName, avatar, email } = args
        const user = await User.findByIdAndUpdate(args.id, { id, fullName, avatar, email }, { new: true });
        if (user) return user
        else return null
    },
    deleteUser: async(id) => {
        const user = await User.findByIdAndDelete(id);
        if (user) return true
        else return false
    },

}

module.exports = mongoDataMethods