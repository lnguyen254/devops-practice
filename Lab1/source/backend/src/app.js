require('dotenv').config({ path: '.env' })

require('./database/mongodb')

const express = require('express')
const User = require('./models/user')

const app = express()

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/health', async (req, res) => {
  const users = await User.find({})
  if (res.status(200) && users.length >= 0) {
    res.send('OK')
  } else {
    res.send('NOT OK')
  }
})

app.get('/users', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

module.exports = app