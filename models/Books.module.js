const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
   title: {
      type: String,
      require: true
   },
   description: {
      type: String,
      require: true
   },
   author: {
      type: String,
      require: true
   },
   genre: {
      type: [{
         type: String
      }],
      require: true
   },
   category: {
      type: [{
         type: String
      }],
      require: true
   },
   publisher: {
      type: String
   },
   year: {
      type: Number,
      require: true
   },
   pageCount: {
      type: Number,
      require: true
   },
   language: {
      type: String,
      required: true
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
      required: true
   },
   fileBook: {
      type: String,
      required: true
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