const express = require('express')
const router = express.Router();
const socket = require('../helpers/pubsub');

router.post('/remoteactions/execute/:type', (req, res) => {

    socket.emit(req.params.type, req.body);

    res.json({
        type: req.params.type,
        obj: req.body
    })
})

module.exports = router;