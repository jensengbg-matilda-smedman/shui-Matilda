const { Router } = require('express');
const { db } = require('./db');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const CryptoJS = require('crypto-js');

const router = new Router();

router.post('/', async (req, res) => {
    if(req.body.username && req.body.password) { 
        const HASHED_PW = await bcrypt.hash(req.body.password, 10);
        const USER_KEY = shortid.generate();
        const ENCRYPTED_USERKEY = CryptoJS.AES.encrypt(USER_KEY, process.env.SECRET).toString();

        let user = {
            uuid: shortid.generate(),
            username: req.body.username,
            password: HASHED_PW,
            userkey: ENCRYPTED_USERKEY,
            hashtagsFollowed: []
        }
        
        // Add new user to db
        db.get('users')
        .push(user)
        .write()

        res.status(201).send('User created');
    } else {
        res.status(400).send('Did you entered the credentials correctly?')
    }
})

module.exports = router;