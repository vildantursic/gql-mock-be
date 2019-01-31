const { userResolvers } = require('./partials/user')
const { meetupResolvers } = require('./partials/meetup')
const { voteResolvers } = require('./partials/vote')
const { meetupAdded, userAdded, voteAdded } = require('./partials/subscription')
const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Vote {
    _id: String!
    status: Boolean!
}

type Votes {
    left: Int!
    right: Int!
}

input VoteInput{
    status: Boolean!
}

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
    votes: [Vote!]!
    numOfVotes: Votes!
}

type Mutation {
    addUser(input: UserInput): User!
    addMeetup(input: MeetupInput): Meetup!
    addVote(input: VoteInput): Vote!
    clearVotes: Boolean!
}

type Subscription {
  userAdded: User!
  meetupAdded: Meetup!
  voteAdded: Votes!
}

schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}

`

const resolvers = {
    Query: {
        users: userResolvers.users,
        meetups: meetupResolvers.meetups,
        votes: voteResolvers.votes,
        numOfVotes: voteResolvers.numOfVotes
    },
    Mutation: {
        addUser: userResolvers.addUser,
        addMeetup: meetupResolvers.addMeetup,
        addVote: voteResolvers.addVote,
        clearVotes: voteResolvers.clearVotes
    },
    Subscription: {
        userAdded: userAdded,
        meetupAdded: meetupAdded,
        voteAdded: voteAdded
    }
}

module.exports = {
    typeDefs,
    resolvers
}