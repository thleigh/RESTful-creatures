const express = require('express')
const app = express()
//create an instance of layouts
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs') //will use to read json files
const { resolveSoa } = require('dns')

//tell express we're using ejs
app.set('view engine', 'ejs')
app.use(ejsLayouts) //tell express
app.use(express.urlencoded({extended: false})) //body-parser middleware

app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

app.get('/', (req, res) => {
    console.log('Home route was hit!')
    res.render('home')
})

app.listen(8000)