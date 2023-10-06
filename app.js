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
const restaurants = require('./public/jsons/restaurant.json').results

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {

  res.render('restaurants', { restaurants })
})
//restaurant
app.get('/restaurant/:id', (req, res) => {
  const id = Number(req.params.id)
  if (id === NaN) res.status(403).render() // 錯誤處理，但是不太清楚要怎麼用
  // if (!restaurant) res.status(403).render()
  const restaurant = restaurants.find((item) => item.id === id)
  res.render('detail', { restaurant })
})

app.listen(port, () => {
  console.log(`express server on http://localhost:${port}`)
})