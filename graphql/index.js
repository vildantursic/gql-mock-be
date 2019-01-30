const { userResolvers } = require('./partials/user')
const { meetupResolvers } = require('./partials/meetup')
const { merge } = require('lodash');
const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: String!
    name: String!
    surname: String!
    age: Int!
}

input UserInput{
    name: String!
    surname: String!
    age: Int!
}

type Meetup {
    _id: String!
    title: String!
    description: String!
    attendees: [User!]!
}

input MeetupInput {
    title: String!
    description: String!
} 

type Query {
    users(fake: Boolean, limit: Int, skip: Int): [User!]!
    meetups(fake: Boolean, limit: Int, skip: Int): [Meetup!]!
}

# type Mutation {
#     createUser(body: UserInput): User!
#     createMeetup(body: MeetupInput): Meetup!
# }

`

// const resolvers = merge(userResolvers, meetupResolvers)
const resolvers = {
    Query: {
        ...userResolvers,
        ...meetupResolvers
    }
}

module.exports = {
    typeDefs,
    resolvers
}