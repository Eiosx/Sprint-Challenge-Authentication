const axios = require('axios');
const bcrypt = require('bcryptjs');
const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const user = req.body;
  const {username, password} = req.body;

  if(user && username && password){
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;

    db.insert(user)
    .into('users')
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      res.status(500).json({err});
    });
  }else {
    res.status(400).json({message: 'Please include a username and password.'});
  }
};

function login(req, res) {
  const {username, password} = req.body;

  if(username && password){
    db('users')
    .where({username})
    .first()
    .then(user => {
      if(response && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);
        res.json({message: `Hello ${user.username}!`,
      token: token});
      }else {
        res.status(401).json({message: 'You shall not pass!'})
      }
    })
  }else{
    res.status(400).json({message: 'Please provide a username and password.'});
  }
};

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
