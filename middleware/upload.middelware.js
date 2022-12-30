require('dotenv').config()
const { google } = require('googleapis');
const path = require('path');
const utf8 = require('utf8');
var multer = require('multer')
var GoogleDriveStorage = require('multer-google-drive')
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n')


const auth = new google.auth.GoogleAuth({
   credentials: {
      private_key: GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
   },
   scopes: ['https://www.googleapis.com/auth/drive']
})

const drive = google.drive({version: 'v3', auth: auth})


const typesImg = ['image/png', 'image/jpeg', 'image/jpg']
const uploadImg = multer({
   storage: GoogleDriveStorage({
      drive: drive,
      parents: '1Z4U9BepV_05HUFsjUfV9v8bb1PDGYDB0',
      fileName: function (req, file, cb) {
         if(typesImg.includes(file.mimetype)){
            cb(null, "mdpu_cover")
         }
         else {
            cb(null, false)
         }
      }
   })
})

const typesFile = ['application/pdf']
const uploadFile = multer({
   storage: GoogleDriveStorage({
      drive: drive,
      parents: '1V6ySubgMzAvpS_IbhcpvevBKLj_SCnbE',
      fileName: function (req, file, cb) {
         if(typesFile.includes(file.mimetype)){
            cb(null, "mdpu_"+utf8.decode(file.originalname))
         }
         else {
            cb(null, false)
         }
      }
   })
})

module.exports = { uploadImg, uploadFile }