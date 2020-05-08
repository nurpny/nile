const router = require('express').Router()

router.use('/books', require('./books'))

router.use('/book', require('./book'))

router.use('/genres', require('./genres'))

router.use('/cart', require('./cart'))

router.use('/order', require('./order'))

module.exports = router
