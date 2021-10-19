const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // get Restaurant Model from restaurant.js
const restaurantList = require('../../restaurant.json')
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('db connected')
  for (let i = 0; i < restaurantList.results.length; i++) {
    const list = restaurantList.results[i]
    Restaurant.create({ id : list.id, name : list.name, category : list.category, image : list.image, location : list.location, phone : list.phone, google_map : list.google_map, rating : list.rating, description : list.description})
}})

console.log(restaurantList.results.length)