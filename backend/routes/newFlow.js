const { Router } = require('express');
const { db } = require('./db');
const router = new Router();
const shortid = require('shortid'); 
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    if(!req.body.info || !req.body.hashtag) {
        return res.send('no content available');
    }
    let token = req.headers['authorization'].split('')[1];
    try {
        const verifiedUser = jwt.verify(token, process.env.JWT)
        const user = db.get('user').find({ uuid: verified_user.uuid }).value();

        let newFlow = {
            flowID: shortid.generate(),
            hashtag: req.body.hashtag,
            info: req.body.info,
            owner: user.username
        };
        db.get('flows').push(newFlow).write()
    } catch(err) {
        res.status(400).send('hm..');
        console.log(err)
    }
})

module.exports = router