// step 0 : new folder => npm init => npm install => npm i express-handlebars
// step 1 : load express-related modules (express framwork & express template engine) and server-related variables
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant') //load restaurant model

// step 2 : set template engine & static file
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('assets'))

// setup database connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('mongo connected')
})

//setup body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true })) //"use" 屬性要求每筆請求經過 body-parser 先處理 

// step 3 : set dynamic route
app.get('/', (req, res) => {
  return Restaurant.find().lean().then(restaurants => (res.render('index', { restaurants: restaurants }))).catch(err => console.log(err))
})

// show restaurant page deatail 
app.get('/restaurants/:restaurant_id', (req, res) => {
  // const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  return Restaurant.findById(req.params.restaurant_id).lean().then((restaurant) => { res.render('show', { restaurant: restaurant }) }).catch(err => console.log(err));
})

// search function
app.get('/search', (req, res) => {
  const keywords = req.query.keyword.toLowerCase().trim()
  Restaurant.find().lean().then(restaurants => { res.render('index', { restaurants: restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keywords) || restaurant.category.toLowerCase().includes(keywords)), keyword: keywords }) }).catch(err => console.log(err))
})
// add new restaurant feature
app.get('/restaurant/new', (req, res) => {
  res.render('new')
})
app.post('/restaurants', (req, res) => {
  const new_res = req.body
  return Restaurant.create(new_res).then(() => res.redirect('/')).catch(err => console.error(err))
})

// add edit feature
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id).lean().then(restaurant => res.render('edit', { restaurant })).catch(err => console.error(err))
})
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const edit_res = req.body
  return Restaurant.findById(id).then(restaurant => {
    restaurant.name = edit_res.name;
    return restaurant.save()
  }).then(() => {
    res.redirect(`/restaurants/${id}`)
  }).catch(err => console.log(err))
})

// add delete feature
app.post('/restaurants/:id/delete', (req, res) => {
  console.log(req.params)
  const id = req.params.id
  return Restaurant.findById(id).then(restaurant => {
    restaurant.remove()
    res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
})

app.listen(port, () => {
  console.log('this is your restaruant website by express')
})