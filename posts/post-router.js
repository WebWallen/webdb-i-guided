const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    // res.send('Hit the get request to /api/posts')
    db.select('*').from('posts')
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => res.status(500).json({ message: err }))
})

router.get('/:id', (req, res) => {
    db.select('*').from('posts').where('id', '=', req.params.id).first() // where always returns an array, use first() to avoid default
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => res.status(500).json({ message: err }))
});

router.post('/', (req, res) => {
    const postData = req.body;
    db('posts').insert(postData, 'id')
    .then(ids => {
        res.status(200).json(ids)
    })
    .catch(err => res.status(500).json({ message: err }))
});

router.put('/:id', (req, res) => {
    db('posts').where({id: req.params.id}).update(req.body)
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
    db('posts').where({id: req.params.id}).delete()
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

module.exports = router;