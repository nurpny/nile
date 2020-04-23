const router = require('express').Router()

router.use('/books', require('./books'))

router.use('/book', require('./book'))

router.use('/cart', require('./cart'))


module.exports = router
