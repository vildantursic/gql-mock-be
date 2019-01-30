const { pubsub } = require('../../helpers/pubsub')

const USER_ADDED_TOPIC = 'users';
const MEETUP_ADDED_TOPIC = 'meetups';

const subscriptionResolvers = {
  Subscription: {
    userAdded: {
        resolve: (payload, args, context, info) => {
            return payload.users;
        },
        subscribe: () => pubsub.asyncIterator(USER_ADDED_TOPIC),
    },
    meetupAdded: {
        resolve: (payload, args, context, info) => {
            return payload.meetups;
        },
        subscribe: () => pubsub.asyncIterator(MEETUP_ADDED_TOPIC),
    }
  },
}

module.exports = subscriptionResolvers;