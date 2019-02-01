const pubsub = require('../../helpers/pubsub')
const {
  USER_ADDED,
  MEETUP_ADDED,
  VOTE_ADDED,
  VOTES_CLEARED
} = require('./actions.js')

const subscriptionResolvers = {
  userAdded: {
      subscribe: () => pubsub.asyncIterator([USER_ADDED])
  },
  meetupAdded: {
      subscribe: () => pubsub.asyncIterator([MEETUP_ADDED])
  },
  voteAdded: {
    subscribe: () => pubsub.asyncIterator([VOTE_ADDED])
  },
  votesCleared: {
    subscribe: () => pubsub.asyncIterator([VOTES_CLEARED])
  }
}

module.exports = subscriptionResolvers;