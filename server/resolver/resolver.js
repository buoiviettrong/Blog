const { posts, users } = require('../data/static')

// Ham tra du lieu that su 

const resolvers = {
    Query: {
        posts: () => posts,
        users: () => users,
    }
}

module.exports = resolvers