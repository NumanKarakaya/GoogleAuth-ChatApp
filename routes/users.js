const express = require('express');
const router = express.Router();

const Users=require('../models/users');


/* GET users listing. */
router.get('/', (req, res, next)=> {
  const user=Users;
  const promise=new Promise
  res.send('respond with a resource');
});

module.exports = router;
