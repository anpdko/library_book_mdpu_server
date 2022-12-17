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
      imgCover: !!book?.imgCover?book?.imgCover:'',
      fileBook: book.fileBook
   }
}


router.post('/', verifyToken, (req, res) =>{
   const newBooks = setNewBook(req.body)


   console.log(newBooks)
   res.json({mess: "OK"})
})


module.exports = router