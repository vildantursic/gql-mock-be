const faker = require('faker');
const Meetup = require('../../models/meetup')
const { generateData } = require('../../helpers/index')
const pubsub = require('../../helpers/pubsub')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const MeetupType = new GraphQLObjectType({
    name: 'Meetup',
    fields: () => ({
        title: { 
            type: GraphQLString,
            resolve: () => {
                
            }
        },
        description: { type: GraphQLString }
    }),
})

const meetupResolvers = {
    meetups: async ({ fake, limit, skip }) => {
        if (fake === true) {
			return generateData(limit, skip, {
                _id: faker.random.uuid,
                title: faker.lorem.text,
                description: faker.lorem.text,
                attendees: generateData(limit, skip, {
                    _id: faker.random.uuid,
                    name: faker.name.firstName,
                    surname: faker.name.lastName,
                    age: faker.random.number(100)
                })
            })
		} else {
			return await Meetup.find().limit(limit).skip(skip).lean().exec()
		}
    },
    // createMeetup: async (req) => {
    //     const meetup = new Meetup(req.body);
    //     const res = await meetup.save();
    //     pubsub.publish('meetups', { meetupAdded: res })
    //     return res;
    // }
}

module.exports = {
    meetupResolvers
}