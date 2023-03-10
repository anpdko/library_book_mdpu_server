require('dotenv').config()
const {Router} = require('express')
const router = Router()
const Admin = require('../models/Admin.module')
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')
const {verifyToken} = require('../middleware/admin.middleware')
// const {check, validationResult} = require('express-validator')



// router.post('/registration', async (req, res) => {
//    const {login, password} = req.body
//    const hashedPassword = await bcrypt.hash(password, 12)
//    const admin = new Admin({
//       login, password: hashedPassword
//    })
//    await admin.save()
// })

router.get('/', async (req, res) => {
   Admin.find()
   .then((admins) => {
      return res.json(admins);
   })
   .catch((err) => {
      console.log(err)
      return res.status(400).json({ message: 'Администраторов не найдено' })
   })
})


router.post('/login', async (req, res) => {
   try {
      const {login, password} = req.body

      const admin = await Admin.findOne({login})
      if(!admin){
         return res.status(400).json({message: {
            login: 'Такого Login нет в базе!'
         }})
      }
      const isMatch = await bcrypt.compare(password,  
         admin.password)

      if(!isMatch){
         return res.status(400).json({message: {
            password: 'Не верный пароль!'
         }})
      }

      const jwtSecret = process.env.JWT_SECRET
      const token = jwtToken.sign(
         {adminId: admin.id},
         jwtSecret,
         {expiresIn: '1h'}
      )
      res.json({
         token, 
         login: admin.login, 
         adminId: admin.id,
      })
   }
   catch(error){
      console.error(error)
   }
})




module.exports = router