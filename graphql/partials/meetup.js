const faker = require('faker');
const Meetup = require('../../models/meetup')
const { generateData } = require('../../helpers/index')
const pubsub = require('../../helpers/pubsub')
const {
    MEETUP_ADDED
} = require('./actions.js')

const meetupResolvers = {
    meetups: async (root, args) => {
        if (args.fake === true) {
			return generateData(args.limit, args.skip, {
                _id: faker.random.uuid,
                title: faker.lorem.text,
                description: faker.lorem.text,
                attendees: generateData(args.limit, args.skip, {
                    _id: faker.random.uuid,
                    name: faker.name.firstName,
                    surname: faker.name.lastName,
                    age: faker.random.number(100)
                })
            })
		} else {
			return await Meetup.find().limit(args.limit).skip(args.skip).lean().exec()
		}
    },
    addMeetup: async (root, args) => {
        try {
            const meetup = new Meetup(args.input);
            const res = await meetup.save();
            pubsub.publish(MEETUP_ADDED, { meetupAdded: res })
            return res;
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = {
    meetupResolvers
}