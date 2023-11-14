const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const auth = require('./routeMid');


router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, userId } = req.body
    console.log(req.body);
    let genre = new Genre({
        name,
        userId
    });
    genre = await genre.save();

    res.send(genre);
});


router.get('/me', auth, async(req, res) => {

    // const genres = await Genre.findById(req.loginName._id).populate('name');
    console.log(req.loginName);
    console.log("just vibes")
    const genres = await Genre.findOne({ userId: req.loginName._id });
    console.log('hello');

    console.log('my genres,', genres)

    return res.send(genres);



});
router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.delete('/:id', async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

module.exports = router;