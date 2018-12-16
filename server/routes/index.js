let express = require('express');
let router = express.Router();

router.use('/', require('./home'))
router.use('/login', require('./login'))

module.exports = router;
