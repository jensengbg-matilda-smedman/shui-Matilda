const { Router } = require('express');
const { db } = require('./db');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');
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

        let existingUser = db.get('users').find(req.body.username).value();
        if (existingUser = undefined) {
            db.get('users').push(user).write();
            res.status(201).send('user ok')
        } else {
            res.status(400).send('user already exitst')
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

router.delete('/', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    try {
        const verified_user = jwt.verify(token, process.env.JWT_)
        db.get('users').remove({uuid: verified_user.uuid}).write();
        res.status(201).send('user deleted!')

        db.get('flows').filter({owner: CryptoJS.SHA3(verified_user.uuid).toString()}).forEach((users) => {
            users.username = 'Deleted'
        }).write();
    } catch {
        res.status(400).send('not deleted?')
    }
})

module.exports = router;