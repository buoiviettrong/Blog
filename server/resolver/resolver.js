const { posts, users } = require('../data/static')

// Ham tra du lieu that su 

const resolvers = {
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
}

module.exports = resolvers