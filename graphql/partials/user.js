const gql = require('graphql-tag');
const User = require('../../models/user')
const faker = require('faker');
const { generateData } = require('../../helpers/index')
const pubsub = require('../../helpers/pubsub')

const userModel = `
	name: String!
	surname: String!
	age: Int!
`

const userSchema = `
    type User {
		_id: String!
		${userModel}
	}
	
	input UserInput{
		${userModel}
	}
`;

const userResolvers = {
	users: async ({ fake, limit, skip }) => {
		if (fake === true) {
			return generateData(limit, skip, {
				_id: "",
				name: faker.name.firstName,
				surname: faker.name.lastName,
				age: faker.random.number(100)
			})
		} else {
			return await User.find().limit(limit).skip(skip).lean().exec()
		}
	},
	createUser: async (req) => {
		const user = new User(req.body);
		const res = await user.save();
        pubsub.publish('users', { userAdded: res })
		return res;
	}
}

module.exports = {
	userSchema,
	userResolvers
}