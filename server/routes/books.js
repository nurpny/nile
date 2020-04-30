const router = require('express').Router()

const {Book, Author, Genre} = require('../db/index')



router.get('/:genreId', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      attributes: {exclude: ['description']},
      include: [{
        model: Author,
        attributes: ["firstName", "lastName"] ,
        through: {attributes: []}
        },{
        model:Genre,
        attributes: ["id","name"] ,
        where: {id: req.params.genreId},
        through: {attributes: []}
      }]})
    res.json(books)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      attributes: {exclude: ['description']},
      include: [{
        model: Author,
        attributes: ["firstName", "lastName"] ,
        through: {attributes: []}
        },{
        model:Genre,
        attributes: ["id","name"] ,
        through: {attributes: []}
      }]})
    res.json(books)
  } catch (err) {
    next(err)
  }
})



module.exports = router
