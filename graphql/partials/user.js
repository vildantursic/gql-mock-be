const User = require('../../models/user')
const faker = require('faker');
const { generateData } = require('../../helpers/index')
const pubsub = require('../../helpers/pubsub')
const {
    USER_ADDED
} = require('./actions.js')

const userResolvers = {
	users: async (root, args) => {
		if (args.fake === true) {
			return generateData(args.limit, args.skip, {
				_id: "",
				name: faker.name.firstName,
				surname: faker.name.lastName,
				age: faker.random.number(100)
			})
		} else {
			return await User.find().limit(args.limit).skip(args.skip).lean().exec()
		}
	},
	addUser: async (root, args) => {
		try {
			const user = new User(args.input);
			const res = await user.save();
			pubsub.publish(USER_ADDED, { userAdded: res })
			return res;
		} catch(err) {
			console.log(err)
		}
	}
}

module.exports = {
	userResolvers
}