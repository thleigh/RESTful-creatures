const express = require('express');
const router = express.Router();
const fs = require('fs');

// index route
router.get('/', (req, res) => {
    // get the json from dinosaurs.json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // convert the json to javascript
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        dinoData = dinoData.filter((dino)=> {
            return dino.name.toLowerCase()===nameFilter.toLowerCase()
        })
    }

    //render our dino index page and pass it the dinoData as "myDinos"
    res.render('dinosaurs/index', {myDinos: dinoData})
})

//get the new data form
router.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})

// show route
router.get('/:id', (req, res) => {
    // get the json from dinosaurs.json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // convert the json to javascript
    let dinoData = JSON.parse(dinosaurs)
    //grab the id parameter from the url and conver to int (was string originally)
    let dinoIndex = parseInt(req.params.id)
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

//post a new dino!
router.post('/', (req, res) => {
    //get json dinos and convert to a js array of objects
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //push new dino to the array
    dinoData.push(req.body)

    //convert dinoData back to JSON and wite to dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //redirect to the index get route
    res.redirect('/dinosaurs')   
})

//get the update form
router.get('/edit/:id', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/edit', {dino: dinoData[req.params.id], dinoId: req.params.id})
})

//put route for updating dino information
router.put('/:id', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)

    //update the info
    //re-assigning the name and type fields of the dinosaurs
    dinosaurs[req.params.id].name = req.body.name
    dinosaurs[req.params.id].type = req.body.type

    //save the edited dinosaurs information
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))
    res.redirect('/dinosaurs')
})

//show route [uses URL parameter 'url']
router.delete('/:id', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)

    //delete the dinosaur from the json file
    //use splice method to delete it from the array that's saved in the variable dinosaurs
    dinosaurs.splice(req.params.id, 1)

    //save the dinosaurs back into the JSON file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))

    res.redirect('/dinosaurs');
})

module.exports = router;