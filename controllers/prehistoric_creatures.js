const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureDino = JSON.parse(prehistoric_creatures)

    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        creatureDino = creatureDino.filter((dino)=> {
            return dino.name.toLowerCase()===nameFilter.toLowerCase()
        })
    }

    res.render('prehistoric_creatures/index', {myCreatures: creatureDino})
})

router.get('//new', (req, res) => {
    res.render('prehistoric_creatures/new')
})

router.get('/:id', (req, res) => {
    let myCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureDino = JSON.parse(myCreatures)
    let dinoIndex = parseInt(req.params.id)
    res.render('prehistoric_creatures/show', {myCreatures: creatureDino[dinoIndex]})
})

//post a new dino!
router.post('/', (req, res) => {
    //get json dinos and convert to a js array of objects
    let myCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureDino = JSON.parse(myCreatures)
    //push new dino to the array
    creatureDino.push(req.body)

    //convert creatureDino back to JSON and wite to myCreatures.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureDino))
    //redirect to the index get route
    res.redirect('/prehistoric_creatures')   
})

module.exports = router;
