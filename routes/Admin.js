const express = require('express');
const { handleSignIn, handleSignup, getAdminProfileByToken, updateAdminByToken } = require('../controller/Admin');
const router = express.Router();
const admin = require("../middleware/Admin")

router.post("/signup", handleSignup);

router.post('/signin', handleSignIn);

router.get('/profile', admin, getAdminProfileByToken);

router.patch('/update', admin, updateAdminByToken);

module.exports = router;