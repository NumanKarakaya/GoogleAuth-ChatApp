const express = require('express');
const router = express.Router();

/* GET chat page. */
router.get('/chat', (req, res, next)=> {
  res.render('chat');
});

module.exports = router;
