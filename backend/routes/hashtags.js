const { Router } = require('express');
const { db } = require('./db');
const router = new Router();
const jwt = require('jsonwebtoken');

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

router.post('/', async(req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const verified_user = jwt.verify(token, process.env.JWT_)

        const users = db
        .get('users')
        .find({ uuid: verified_user.uuid })
        .get('hashtagsFollowed')
        .push(req.body.hashtagsFollowed)
        .write()
        
        res.send(users.hashtagsFollowed)
    } catch(err) {
        console.log(err)
        res.status(400).send('whops')
    }
})

/*router.delete("/", async (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
  
    try {
        console.log("body hashtag ", req.body.hashtagsFollowed); //find hashtag
      const verified_user = jwt.verify(token, process.env.JWT_);
      console.log('vu', verified_user); //{ uuid: 'Q5clexdwg', iat: 1617911812 }
      const users = db
        .get('users')
        .find({ uuid: verified_user.uuid })
        .filter({ hashtagsFollowed: req.body.hashtagsFollowed })
        .remove()
        .write();
  
      console.log('console', users.hashtagsFollowed); //undef
      console.log('console users', users); // []
      res.send(users.hashtagsFollowed);
    } catch (error) {
      console.error(error);
      res.sendStatus(401);
    } 
  }); */
  router.post('/remove', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
        const verified_user = jwt.verify(token, process.env.JWT_);
        let user = await db.get('users')
        .find({ uuid: verified_user.uuid })
        .get('hashtagsFollowed').pullAll(req.body.hashtagsFollowed).write()

        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
})

module.exports = router;