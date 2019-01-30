const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const { userSchema, userResolvers } = require('./partials/user')
const { meetupSchema, meetupResolvers } = require('./partials/meetup')
const { subscriptionResolvers } = require('./partials/subscription')
const { merge } = require('lodash');
const { gql } = require('apollo-server-express');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        users:
        meetups:
    }
})

module.exports = {
    schema,
    resolvers
}