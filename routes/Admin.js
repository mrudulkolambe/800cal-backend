const express = require('express');
const { handleSignIn, handleSignup, getAdminProfileByToken, updateAdminByToken, createDetails, updateDetails, getDetails } = require('../controller/Admin');
const router = express.Router();
const admin = require("../middleware/Admin")

router.post("/signup", handleSignup);

router.post('/signin', handleSignIn);

router.get('/profile', admin, getAdminProfileByToken);

router.patch('/update', admin, updateAdminByToken);

router.patch('/details/update', admin, updateDetails);
router.post('/details/create', admin, createDetails);
router.get('/details', getDetails);

module.exports = router;