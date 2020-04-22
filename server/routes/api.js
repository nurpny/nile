const router = require('express').Router()
const {Book, Author, Genre} = require('../db/index')


router.get('/books', async (req, res, next) => {
  try {
    const books = await Book.findAll(
      {attributes: {exclude: ['description']}},
      {include: [{
        model: Author,
        attributes: ["firstName", "lastName"] ,
        through: {attributes: []}
        },{
        model:Genre,
        attributes: ["name"] ,
        through: {attributes: []}
      }]})
    res.json(books)
  } catch (err) {
    next(err)
  }
})


router.get('/book/:id', async (req, res, next) => {
  try {
    const books = await Book.findByPk(req.params.id,
      {include: [{
        model: Author,
        attributes: ["firstName", "lastName"] ,
        through: {attributes: []}
        },{
        model:Genre,
        attributes: ["name"] ,
        through: {attributes: []}
      }]})
    res.json(books)
  } catch (err) {a
    next(err)
  }
})



module.exports = router
