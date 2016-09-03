var express = require('express');
var router = express.Router();
var spawn = require("child_process").spawn;
var process = null;

router.get('/api/user', function(req, res) {
  if (req.session && req.session.user) {
    res.status(200).send(req.session.user);
  }
  else {
    res.status(400).send("");
  }
});

module.exports = router;
