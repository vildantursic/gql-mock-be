const express = require('express')
const router = express.Router();
const faker = require('faker');

router.get('/getlayers', (req, res) => {
    const data = new Array(10).fill().map((el) => {
        return {
            id: faker.random.uuid(),
            title: `Open ${faker.random.number(100000)}`,
        }
    })
    res.json(data)
})

router.get('/getnotifications', (req, res) => {
    const data = new Array(10).fill().map((el) => {
        return {
            id: faker.random.uuid(),
            type: faker.helpers.randomize(['hospital', 'police', 'firedep']),
            date: new Date()
        }
    })
    res.json(data)
})

router.get('/getfavourites', (req, res) => {
    const data = new Array(10).fill().map((el) => {
        return {
            id: faker.random.uuid(),
            type: 'Test'
        }
    })
    res.json(data)
})

module.exports = router;