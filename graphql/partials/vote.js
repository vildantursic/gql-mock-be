const Vote = require('../../models/vote')
const { generateData } = require('../../helpers/index')
const pubsub = require('../../helpers/pubsub')
const {
    VOTE_ADDED
} = require('./actions.js')

async function calculateVotes () {
    const left = await Vote.find({ status: true }).count().lean().exec()
    const right = await Vote.find({ status: false }).count().lean().exec()
    return {
        left,
        right
    }
}

const voteResolvers = {

	votes: async (root, args) => {
        return await Vote.find().lean().exec()
    },
    numOfVotes: async (root, args) => {
        return await calculateVotes()
    },
	addVote: async (root, args) => {
		try {
			const vote = new Vote(args.input);
			const res = await vote.save();
			pubsub.publish(VOTE_ADDED, { voteAdded: await calculateVotes() })
			return res;
		} catch(err) {
			console.log(err)
		}
	}
}

module.exports = {
	voteResolvers
}