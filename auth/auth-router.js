const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/user-model');
const secrets = require('../api/secrets');

router.post('/register', (req, res) => {
  // implement registration
  let acctInfo = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(acctInfo.password, rounds);
  acctInfo.password = hash;

  Users.add(acctInfo)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message })
    })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user[0].password)) {
        const token = generateToken(user[0]);
        res.json({ message: 'Welcome!', token })
      } else {
        res.status(401).json({ message: 'You shall not pass!' })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message })
    })
});

function generateToken(user) {
  const payload = {
    sub: user.id
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: '12h'
  };
  return jwt.sign(payload, secret, options)
}

module.exports = router;
