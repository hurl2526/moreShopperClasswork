const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session)
  res.render('main/home');
});

router.get('/logout', function(req, res) {
  req.logout()
  req.session.destroy()
  return res.redirect('/')
});

module.exports = router;
