// tutorials from : https://www.youtube.com/watch?v=vjf774RKrLc
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

const port = process.env.PORT || 3000

//import routes
const postsRouter = require('./routes/posts')

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/posts', postsRouter)

//db connection
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true,
    useUnifiedTopology: true },
     ()=> {console.log('connected to db')
})

app.get('/',(req, res) => {
    res.send('home page')
})

app.listen(port)
console.log('listening on port '+port)


