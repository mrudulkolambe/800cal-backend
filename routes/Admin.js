const express = require('express');
const { handleSignIn, handleSignup, getAdminProfileByToken, updateAdminByToken, createDetails, updateDetails, getDetails } = require('../controller/Admin');
const router = express.Router();
const handleAdmin = require("../middleware/Admin")

router.post("/signup", handleSignup);

router.post('/signin', handleSignIn);

router.get('/profile', handleAdmin, getAdminProfileByToken);

router.patch('/update', handleAdmin, updateAdminByToken);

router.patch('/details/update', handleAdmin, updateDetails);
router.post('/details/create', handleAdmin, createDetails);
router.get('/details', getDetails);

module.exports = router;