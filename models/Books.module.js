const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
   title: {
      type: String,
      require: true,
      default: 'не вказано'
   },
   description: {
      type: String,
      require: true,
      default: 'не вказано'
   },
   author: {
      type: String,
      require: true,
      default: 'не вказано'
   },
   genre: {
      type: [{
         type: String
      }],
      require: true,
      default: ['не вказано']
   },
   category: {
      type: [{
         type: String
      }],
      require: true,
      default: ['не вказано']
   },
   publisher: {
      type: String,
      require: true,
      default: 'не вказано'
   },
   year: {
      type: Number,
      require: true,
      default: 0
   },
   pageCount: {
      type: Number,
      require: true,
      default: 0
   },
   language: {
      type: String,
      required: true,
      default: 'не вказано'
   },
   rating: {
      type: Number,
      default: 0
   },
   countRating: {
      type: Number,
      default: 0
   },
   date: {
      type: Date,
      default: Date.now
   },
   imgCover: {
      type: String,
      required: true,
      default: 'не вказано'
   },
   fileBook: {
      type: String,
      required: true,
      default: 'не вказано'
   },
   comments: {
      type: [{
         name: {
            type: String,
         },
         comment: {
            type: String,
         },
         date: {
            type: Date,
            default: Date.now
         },
      }]
   }
})

module.exports = Books = model('Books', schema)