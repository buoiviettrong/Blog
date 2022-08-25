const User = require('../models/userModel')
const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

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
        const list = await Comment.find({ post_id: id });

        list.forEach((comment) => {
            mongoDataMethods.deleteComment(comment.id)
        })
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

    //Comment
    getAllComments: async(condition = null) => condition === null ? await Comment.find() : await Comment.find(condition),
    getCommentById: async(id) => await Comment.findById(id),
    getAllCommentsByPost: async(condition) => Comment.find(condition),
    getAllCommentsByUser: async(condition) => Comment.find(condition),
    getAllCommentsReply: async(id) => Comment.find({ reply_id: id }),
    createComment: async(args) => {
        const curPost = await Post.findById(args.post_id)
        const user = await User.findById(args.user_id)
        const commentReply = await Comment.findById(args.reply_id)

        if (commentReply || args.reply_id == null) {
            args.context = args.context || `reply comment ${args.reply_id}`
            if (args.reply_id == null) {
                const newComment = new Comment(args)
                return await newComment.save()
            }
            const post = await Post.findById(commentReply.post_id)
            if (post.id.toString() === curPost.id.toString()) {
                const newComment = new Comment(args)
                return await newComment.save()
            } else throw new Error("Post of comment does not exist")
        } else {
            const context = !curPost ? "Post does not exist" : !user ? "User does not exist" : !commentReply ? "Comment reply does not exist" : "context does not exist"
            throw new Error(context)
        }
    },
    updateComment: async(args) => {
        const curPost = await Post.findById(args.post_id)
        const user = await User.findById(args.user_id)
        const commentReply = await Comment.findById(args.reply_id)

        if (commentReply || args.reply_id == null) {
            if (args.reply_id == null) {
                const newComment = new Comment(args)
                return await newComment.save()
            }
            const post = await Post.findById(commentReply.post_id)
            if (post.id.toString() === curPost.id.toString()) {
                const Comment = await Comment.findByIdAndUpdate(args.id, args, { new: true });
                if (Comment) return Comment
                else return null
            } else throw new Error("Post of comment does not exist")
        } else {
            const context = !post ? "Post does not exist" : !user ? "User does not exist" : !commentReply ? "Comment reply does not exist" : "context does not exist"
            throw new Error(context)
        }
    },
    deleteComment: async(id) => {
        const comment = await Comment.findByIdAndDelete(id)
        const list = await Comment.find({ reply_id: id })
        list.forEach(element => {
            // await Comment.findByIdAndDelete(element.id)
            mongoDataMethods.deleteComment(element.id)
        });
        if (comment) return true
        else return false
    },
}

module.exports = mongoDataMethods