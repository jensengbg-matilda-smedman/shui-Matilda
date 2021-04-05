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

        let existingUser = db.get('users').find({username: req.body.username}).value();
        if (!existingUser) {
            db.get('users').push(user).write();
            return res.status(201).send('user ok')
        } else {
            res.status(409).send('user already exitst')
        }
    }
})

router.delete('/', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    try {
        const verified_user = jwt.verify(token, process.env.JWT_)
        db.get('users').remove({uuid: verified_user.uuid}).write();
        res.status(201).send('user deleted!')

        let user = db.get("user").find({ uuid: verified_user.uuid }).value();
        let flows = db
          .get('flows').filter({ owner: user.username }).forEach((flow) => {
            {
              flow.owner = 'Anonymous';
            }
          })
          .write();
          console.log('flows', flows)
        db.get('users').remove({ uuid: verified_user.uuid }).write();
        if (user == undefined) return res.sendStatus(404);
    
        res.status(200).send("User deleted");
    } catch {
        res.status(400).send('not deleted?')
    }
})

module.exports = router;