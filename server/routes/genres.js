const router = require('express').Router()

const {Genre} = require('../db/index')


router.get('/', async (req, res, next) => {
  try {
    const genres = await Genre.findAll({
      attributes:['id', 'name']
    })
    res.json(genres)
  } catch (err) {
    next(err)
  }
})



module.exports = router
