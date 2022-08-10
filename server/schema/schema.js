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

    # truy xuat du lieu
    type Query {
        posts: [Post]
        post(id: ID!): Post
        users: [User]
        user(id: ID!): User
    }

    # chinh sua du lieu 
    type Mutation {     
        createUser(fullName: String, avatar: String, email: String) : User
        updateUser(id: ID!, fullName: String, avatar: String, email: String) : User 
        deleteUser(id: ID!): Boolean

        createPost(title: String, description: String, user_id: ID!) : Post
        updatePost(id: ID!, title: String, description: String, user_id: ID) : Post
        deletePost(id: ID!): Boolean
    }
`

module.exports = typeDefs