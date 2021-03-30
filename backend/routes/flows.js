const { Router } = require('express');
const { db } = require('./db');
const router = new Router();
const shortid = require('shortid'); 
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    if(!req.body.info || !req.body.hashtag) {
        return res.send('no content available');
    }
    let token = req.headers['authorization'].split(' ')[1];
    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_)
        const user = db.get('users').find({ uuid: verifiedUser.uuid }).value();

        let newFlow = {
            flowID: shortid.generate(),
            hashtag: req.body.hashtag,
            info: req.body.info,
            owner: user.username
        };

        db.get('flows').push(newFlow).write()
        res.status(201).send('Flow added!')
    } catch(err) {
        res.status(400).send('hm..');
        console.log(err)
    }
});

router.get('/', (req, res) => {
    try {
        const flows = db.get('flows').value();
        res.send(flows)
    } catch(err) {
        res.status(400).send('hm..');
        console.log(err)
    }
})

module.exports = router