let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.name){
    console.log(req.ip)
    req.session.name = '首页'
  }
  res.render('index', { title: `Express-姊妹湖-session${req.session.name}` });
});


module.exports = router;
