'use strict'

const express = require('express')
const { engine } = require('express-handlebars')  // use template engine  "express-handlebars"
const app = express()
const port = 3000

// express-handlebars
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render(`index`)
})

app.listen(port, () => {
  console.log(`express server on http://localhost:${port}`)
})