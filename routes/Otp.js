const express = require('express');
const router = express.Router();


router.post('/generate',generateOtp);

router.post('/validate',validateOtp);

module.exports = router;
