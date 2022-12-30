require('dotenv').config()
const {Router} = require('express')
const router = Router()
const Books = require('../models/Books.module')
const { verifyToken } = require('../middleware/admin.middleware');

setNewBook = (book) => {
   return {
      title: !!book?.title?book?.title:"не вказано",
      description: !!book?.description?book?.description:"не вказано",
      author: !!book?.author?book?.author:"не вказано",
      genre: !!book?.genre?.length?book?.genre:[],
      category: !!book?.category?.length?book?.category:[],
      publisher: !!book?.publisher?book?.publisher:"не вказано",
      year: !!book?.year?book?.year:"не вказано", 
      pageCount: !!book?.pageCount?book?.pageCount:"не вказано",
      language: !!book?.language?book?.language:"українська",
      imgCover: !!book?.imgCover?book?.imgCover:'12J1b4nOtFj1v2jf04artUt0mpmJGTrbl',
      fileBook: !!book?.fileBook?book?.fileBook:'',
      // imgCover: '12J1b4nOtFj1v2jf04artUt0mpmJGTrbl',
      // fileBook: '1zqmLe_SKfvLPKCWg-i33XZDRNCUsj6-l'
   }
}

// GET api/books - Получить все книги
router.get('/', (req, res) => {
   Books.find()
   .then((books) => {
      return res.json(books);
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
   const newBooks = setNewBook(req.body)
   Books.create(newBooks)
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
   Book.findByIdAndDelete(req.params.id)
   .then((book) => {
      res.json({message: "Книга удалена"})
   })
   .catch((err) => {
      res.status(400).json({ message: 'Не удалось удалить книгу' })
   })
})



module.exports = router