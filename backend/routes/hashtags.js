const { Router } = require('express');
const { db } = require('./db');
const router = new Router();
const jwt = require('jsonwebtoken');
const { serialize } = require('lowdb/adapters/FileSync');

router.get('/', (req, res) => {
    try {
        const hashtag = db.get('flows').filter('hashtags').value();
        res.send(hashtag);
    } catch {
        res.status(400).send('not today')
    }
});

module.exports = router;