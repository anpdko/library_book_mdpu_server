const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/admin.middleware')

const {uploadImg, uploadFile} = require('../middleware/upload.middelware')


const uploadBook = uploadFile.single('fileBook')
router.post('/upload/file', uploadBook, (req, res) =>{
  try {
    console.log(req.file)
    res.json({fileId: req.file.fileId})
  }
  catch(err){
    res.status(400).json({ message: 'Не удалось загрузить обложку'})
  }
})


const uploadCover = uploadImg.single('imgCover')
router.post('/upload/img', uploadCover, (req, res) =>{
  try {
    res.json({fileId: req.file.fileId})
  }
  catch(err){
    res.status(400).json({ message: 'Не удалось загрузить обложку'})
  }
})

module.exports = router;