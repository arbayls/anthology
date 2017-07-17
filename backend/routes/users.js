var express = require('express');
var router = express.Router();
var knex = require('../db');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.post('/', function(req, res, next) {
  knex.raw(`SELECT * from users WHERE username='${req.body.username}'`).then(function(users) {
    if (users.rows.length > 0) {
      bcrypt.compare(req.body.password, users.rows[0].password, (err, isVerified) => {
        res.json(isVerified)
      })
    } else {
      res.json(false);
    }
  })
});

router.post('/new', function(req, res, next) {
  knex.raw(`SELECT * from users WHERE username='${req.body.username}'`).then(function(users) {
    if (users.rows.length < 1) {
      bcrypt.hash(req.body.password, 8, function(err, hash) {
        knex.raw(`INSERT into users(username, password) values ('${req.body.username}', '${hash}')`).then((success) => {
          res.json(success)
        })
      })
    } else {
      res.json("Already Exists")
    }
  })
})
module.exports = router;
