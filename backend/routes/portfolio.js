var express = require('express');
var router = express.Router();
var knex = require('../db');

router.post('/articles/new', function(req, res, next) {
  knex.raw(`INSERT into portfolios (url, user_id) values ('${req.body.url}', '${req.body.username}')`).then(function(data) {
    res.json(data);
  })
});

router.get('/articles/:id', function(req, res, next) {
  knex.raw(`SELECT * from portfolios WHERE user_id='${req.params.id}'`).then(function(data) {
    res.json(data);
  })
})

module.exports = router;
