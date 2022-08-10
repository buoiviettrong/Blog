const { gql } = require('apollo-server-express')
    // dinh nghia keu du lieu

const typeDefs = gql `
    type Post {
        id: ID
        title: String
        description: String
    }

    type User {
        id: ID!
        fullName: String
        avatar: String
        email: String
    }

    # ROOT TYPE
    type Query {
        posts: [Post]
        users: [User]
    }
`

module.exports = typeDefs