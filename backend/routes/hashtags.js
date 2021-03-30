const { Router } = require('express');
const { db } = require('./db');
const router = new Router();
const jwt = require('jsonwebtoken');

//Get hashtag that one user follow

router.get('/', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
        const verified_user = jwt.verify(token, process.env.JWT_);
        const user = db.get('users').find({ uuid: verified_user.uuid }).value();

        res.send(user.hashtagsFollowed)
    } catch {
        res.status(400).send('nooo, hmm')
    }
});

module.exports = router;