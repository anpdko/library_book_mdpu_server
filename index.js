require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: true, credentials: true })); // cors
app.use(express.json({extensions: true})) //Для понимание сервером фаормата json
app.use('/static/images', express.static(path.join(__dirname, 'static/images')))


app.use('/api/admin', require('./routes/admin.route'))
app.use('/api/books', require('./routes/books.route'))
app.use('/api/file', require('./routes/file.route'))


const start = async () => {
   try{
      mongoose.set("strictQuery", true);
      await mongoose.connect(process.env.URL_MONGO, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      console.log('Connect MongoDB');
      app.listen(PORT, () => {
         console.log("Server listening on port " + PORT)
      })
   }
   catch(err){
      console.error(err)
   }
}

start()