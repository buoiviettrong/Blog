const { posts, users } = require('../data/static')

// Ham tra du lieu that su 

const resolvers = {
    // Query
    Query: {
        posts: () => posts,
        post: (parent, args) => posts.find(p => p.id.toString() === args.id),
        users: () => users,
        user: (parent, args) => users.find(u => u.id.toString() === args.id),
    },
    Post: {
        user: (parent, args) => users.find(u => u.id.toString() === parent.user_id.toString()),
    },
    User: {
        posts: (parent, args) => posts.filter(p => p.user_id.toString() === parent.id.toString()),
    },

    // Mutation
    Mutation: {
        createUser: (parent, args) => args,
        // updateUser: (parent, args) => posts.update(args.id, args.user),
        // deleteUser: (parent, args) => posts.remove(args.id),

        createPost: (parent, args) => args,
        // updatePost: (parent, args) => posts.update(args.id, args.post),
        // deletePost: (parent, args) => posts.remove(args.id),
    }
}

module.exports = resolvers