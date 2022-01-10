const express = require('express')
require('dotenv').config()
require('./helpers/initMongoose')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

//Routes
app.use('/users', require('./routes/userRouter'))
app.use('/notes', require('./routes/noteRouter'))

//Deploy
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

//Listen server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running at ${PORT}`))
