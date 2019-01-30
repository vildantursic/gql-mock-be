const { buildSchema } = require('graphql');
const gql = require('graphql-tag');
const { userSchema, userResolvers } = require('./partials/user')
const { meetupSchema, meetupResolvers } = require('./partials/meetup')
const { subscriptionResolvers } = require('./partials/subscription')
const { merge } = require('lodash');

const schema = buildSchema(`

${userSchema}

${meetupSchema}

type Query {
    users(fake: Boolean, limit: Int, skip: Int): [User!]!
    meetups(fake: Boolean, limit: Int, skip: Int): [Meetup!]!
}

type Mutation {
    createUser(body: UserInput): User
    createMeetup(body: MeetupInput): Meetup
}

type Subscription {
    userAdded: [User!]!
    meetupAdded: [Meetup!]!
}

schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}

`)

const resolvers = merge(userResolvers, meetupResolvers, subscriptionResolvers)

module.exports = {
    schema,
    resolvers
}