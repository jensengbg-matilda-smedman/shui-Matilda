const { Router } = require('express');
const { db } = require('./db');
const router = new Router();
const shortid = require('shortid');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    try {
        const verified_user = jwt.verify(token, process.env.JWT_)
        let users = db.get('users').find({ uuid: verified_user.uuid }).value()

        const filterFollowHash = (flows) => {
            const filterHash = flows.hashtags.filter((hashtag) =>
                users.hashtagsFollowed.includes(hashtag)
            )
            return filterHash.length > 0
        }

        if (users.hashtagsFollowed.length > 0) {

            let flows = db.get('flows').filter(filterFollowHash).value()
            res.status(200).send(flows)
        } else {
            let flows = db.get('flows').value()
            res.status(200).send(flows)
        }
    } catch (err) {
        console.log(err)
        res.status(404).send('nop')
    }
})


router.post('/', (req, res) => {
    let token = req.headers['authorization'].split(' ')[1];
    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_)
        let userhash = db.get('users').find({ uuid: verifiedUser.uuid }).get('hashtagsFollowed').push(...req.body.hashtags).write()
        console.log('userhash', userhash)
        const user = db.get('users').find({ uuid: verifiedUser.uuid }).value();

        let newFlow = {
            flowID: shortid.generate(),
            date: new Date(),
            hashtags: req.body.hashtags,
            info: CryptoJS.AES.encrypt(req.body.info, process.env.PUBLIC_KEY).toString(),
            owner: user.username
        };

        db.get('flows').push(newFlow).write()
        res.status(201).send('Flow added!')
    } catch (err) {
        res.status(404).send('hm..');
        console.log(err)
    }
});

module.exports = router;


