const { Router, response } = require('express');
const { db } = require('./db');
const router = new Router();
const shortid = require('shortid'); 

router.post('/', (req, res) => {
    try {
        const newflow = db.get('newFlow').value();
        res.send(newFlow)
        let flow = {
            flowId: shortid.generate(),
            hashtag: req.body.hashtag,
            info: req.body.info
        }
    } catch(err) {
        res.status(400).send('hm..');
        console.log(err)
    }
})

module.exports = router