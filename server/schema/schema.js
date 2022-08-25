const { gql } = require('apollo-server-express')
    // dinh nghia keu du lieu

const typeDefs = gql `

    type Post {
        id: ID
        title: String
        description: String
        user: User
        comments: [Comment]
    }

    type User {
        id: ID!
        fullName: String
        avatar: String
        email: String   
        posts: [Post]
        comments: [Comment]
    }

    type Comment {
        id: ID!
        context: String!
        user: User
        post: Post
        reply: Comment
        List: [Comment]
    }

    # ROOT TYPE

    # truy xuat du lieu
    type Query {
        posts: [Post]
        post(id: ID!): Post

        users: [User]
        user(id: ID!): User

        comments: [Comment]
        comment(id: ID!): Comment
        # reply(id: ID!): Comment
    }


    # chinh sua du lieu 
    type Mutation {     
        createUser(fullName: String, avatar: String, email: String) : User
        updateUser(id: ID!, fullName: String, avatar: String, email: String) : User 
        deleteUser(id: ID!): Boolean

        createPost(title: String, description: String, user_id: ID!) : Post
        updatePost(id: ID!, title: String, description: String, user_id: ID) : Post
        deletePost(id: ID!): Boolean

        createComment(user_id: ID!, post_id: ID!, context: String, reply_id:ID): Comment
        updateComment(id: ID!, user_id: ID!, post_id: ID!, context: String, replyTo: String): Comment
        deleteComment(id: ID!): Boolean
    }
`

module.exports = typeDefs