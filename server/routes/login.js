let express = require('express');
let router = express.Router();
const user = require('./../controllers/user')


module.exports = router.get( '/', user.loginPage )

module.exports = router;
