const router = require('express').Router()


const { Order, Cart } = require('../db/index')


router.get('/', async (req, res, next) => {
  try {
    console.log("REQ USER***", req.user)
    console.log("REQ SESSION***", req.sessionID)
    // const order = await
    // res.json({})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log("REQ USER***", req.user)
    console.log("REQ SESSION***", req.sessionID)
    console.log("REQ BODY***", req.body)
    let order;
    if (req.user) {
      order = await Order.findOrCreate(
        {
          where: { userId: req.userId },
          defaults: { userId: req.userId }
        }
      )
    } else {
      order = await Order.findOrCreate(
        {
          where: { SessionID: req.sessionID },
          defaults: { SessionID: req.sessionID }
        }
      )
    }
    order = order['0'].dataValues
    const cart = await Cart.create({
      orderId: order.id,
      bookId: req.body.bookId,
      price: req.body.price,
      quantity: 1
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})



module.exports = router
