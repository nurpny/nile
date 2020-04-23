const router = require('express').Router()

const {Book, Author, Genre} = require('../db/index')



router.get('/:id', async (req, res, next) => {
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
