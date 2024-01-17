const express = require('express');
const { handleSignIn, handleSignup, getManagerProfileByToken, updateManagerByToken, getManagerInfo, getAllManagers } = require('../controller/Manager');
const router = express.Router();
// const handleAdmin = require("../middleware/Man")

router.post("/signup", handleSignup);

router.post('/signin', handleSignIn);

router.get('/profile', getManagerProfileByToken);

router.get('/info/:_id', getManagerInfo);

router.get('/', getAllManagers);

router.patch('/:_id', updateManagerByToken);

module.exports = router;