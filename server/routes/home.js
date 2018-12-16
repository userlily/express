let express = require('express');
let router = express.Router();
const home = require('./../controllers/home')

module.exports = router.get( '/', home.indexPage )

module.exports = router;
