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
  const keyword = req.query.keyword?.trim()
  // 搜尋功能
  const matchedRastaurants = keyword ? restaurants.filter((restaurant) =>
    Object.values(restaurant).some((property) => {
      if (typeof property === 'string') {
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) : restaurants

  res.render('restaurants', { restaurants: matchedRastaurants, keyword })
})

app.get('/restaurant/:id', (req, res) => {
  const id = Number(req.params.id)
  if (id === NaN) res.status(403).render('notFound') // 錯誤處理，但是不太清楚要怎麼用
  const restaurant = restaurants.find((item) => item.id === id)
  if (!restaurant) res.status(403).render('notFound')
  res.render('detail', { restaurant })
})


app.listen(port, () => {
  console.log(`express server on http://localhost:${port}`)
})