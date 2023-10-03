'use strict'

const express = require('express')
// const { engine } = require('express-handlebars')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send(`nodejs it's work!`)
})

app.listen(port, () => {
  console.log(`express server on http://localhost:${port}`)
})