const express = require('express')
const app = express()
const cors = require('cors')

const ENV = require('dotenv')
ENV.config()

const port = Number(process.env.PORT)

const indexRoutes = require('./routes/index')
const repositoryRoutes = require('./routes/repository')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', indexRoutes)
app.use('/repo', repositoryRoutes)

app.listen(port, () => {
  console.log('SERVER IS ON AND IS LISTEN TO', port)
})