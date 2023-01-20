require('dotenv').config()
const {Router} = require('express')
const router = Router()
const Books = require('../models/Books.module')
const { verifyToken } = require('../middleware/admin.middleware');

const PAGE_SIZE = 5;


// GET api/books - Получить все книги
router.get('/', async (req, res) => {
   const page = parseInt(req.query.page || '1') - 1
   const totalPages = await Books.countDocuments({})

   
   Books.find()
   .limit(PAGE_SIZE)
   .skip(PAGE_SIZE * page)
   .sort({date:-1}) 
   .then((books) => {
      return res.json({
         page: page + 1,
         totalPages: Math.ceil(totalPages / PAGE_SIZE),
         books: books
      });
   })
   .catch((err) => {
      console.log(err)
      return res.status(400).json({ message: 'Книги не знайдено' })
   })
})

// GET api/books:id - Получить одну книги
router.get('/:id', (req, res) => {
   Books.findById(req.params.id)
   .then((book) => {
      return res.json(book);
   })
   .catch((err) => {
      console.log(err)
      return res.status(400).json({ message: 'Книга не знайдена' })
   })
})


// POST api/books - Загрузить книгу
router.post('/', verifyToken, (req, res) =>{
   Books.create(req.body)
   .then((book) => {
      return res.json(book)
   })
   .catch((err) => {
      console.log(err)
      return res.status(400).json({ message: 'Некоректні данні книги' })
   })
})

// PUT api/books:id - Изменить книгу
router.put('/:id', verifyToken, (req, res) => {
   Books.findByIdAndUpdate(req.params.id, req.body)
   .then((book)=>{
      return res.json(book)
   })
   .catch((err) => {
      console.log(err)
      return res.status(400).json({ message: 'Не удалось изменить книгу' })
   })
})

// DELETE api/books:id - Удалить книгу
router.delete('/:id', (req, res) => {
   Books.findByIdAndDelete(req.params.id)
   .then((book) => {
      res.json({message: "Книга удалена"})
   })
   .catch((err) => {
      res.status(400).json({ message: 'Не удалось удалить книгу' })
   })
})



module.exports = router