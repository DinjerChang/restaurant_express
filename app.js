// step 0 : new folder => npm init => npm install => npm i express-handlebars
// step 1 : load express-related modules (express framwork & express template engine) and server-related variables
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurantList = require('./restaurant.json')

// step 2 : set template engine & static file
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('assets'))

// step 3 : set dynamic route
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// setup database connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error',() =>{
  console.log('error')
})
db.once('open',() => {
  console.log('mongo connected')
})

// show restaurant page deatail 
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})
// search function
app.get('/search', (req, res) => {
  const keywords = req.query.keyword.toLowerCase().trim()
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keywords) || restaurant.category.toLowerCase().includes(keywords));
  res.render('index', { restaurants: restaurants, keyword: keywords})
})
app.listen(port, () => {
  console.log('this is your restaruant website by express')
})