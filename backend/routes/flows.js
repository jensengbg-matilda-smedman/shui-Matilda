const { Router, response } = require('express');
const { db } = require('./db');
const router = new Router();

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