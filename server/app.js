const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

const dotenv = require("dotenv");

dotenv.config();

//Load Schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// Load db methods

const mongoDataMethods = require('./data/db')

// Connect to MongoDB
const URI = process.env.MONGODB_URL

const connectDB = async() => {
    try {
        await mongoose.connect(URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods })
})

const app = express()

server.start().then(res => {
    server.applyMiddleware({ app })

    app.listen({ port: 4001 }, () => {
        console.log(`Listening on port http://localhost:4001${server.graphqlPath}`)
    })
})