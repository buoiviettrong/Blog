const { gql } = require('apollo-server-express')
    // dinh nghia keu du lieu

const typeDefs = gql `
    type Post {
        id: ID
        title: String
        description: String
        user: User
    }

    type User {
        id: ID!
        fullName: String
        avatar: String
        email: String
        posts: [Post]
    }

    # ROOT TYPE
    type Query {
        posts: [Post]
        post(id: ID!): Post
        users: [User]
        user(id: ID!): User

        # Matching


    }
`

module.exports = typeDefs