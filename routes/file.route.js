const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/admin.middleware')


router.post('/upload', (req, res) =>{
  try {
    res.json(req.data)
  }
  catch(err){
    res.status(400).json({ message: 'Не удалось загрузить обложку'})
  }
})

module.exports = router;