require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const auth = require('./routes/auth');
const users = require('./routes/users');
const flows = require('./routes/flows');
const hashtags = require('./routes/hashtags');
const allHashtags = require('./routes/allHashtags');


const App = express();

App.use(helmet());
App.use(cors());
App.use(express.json());

App.use('/auth', auth);
App.use('/users', users);
App.use('/flows', flows);
App.use('/hashtags', hashtags);
App.use('/allHashtags', allHashtags);



App.listen(3000, () => {
    console.log('Super secure server is up n running!')
})