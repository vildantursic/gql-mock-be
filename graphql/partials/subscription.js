const pubsub = require('../../helpers/pubsub')

const USER_ADDED_TOPIC = 'users';
const MEETUP_ADDED_TOPIC = 'meetups';

const subscriptionResolvers = {
  Subscription: {
    userAdded: {
        subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('users')
    },
    meetupAdded: {
        subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('meetups')
    }
  },
}

module.exports = subscriptionResolvers;