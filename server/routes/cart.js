const router = require('express').Router()
const { Op } = require("sequelize");


const { Order, Cart } = require('../db/index')


router.get('/', async (req, res, next) => {
  try {
    // const order = await
    // res.json({})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let order;
    if (req.user) {
      order = await Order.findOrCreate(
        {
          where: { userId: req.user.id },
          defaults: {
            userId: req.user.id,
            SessionID: req.sessionID
          }
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
    order = order['0'].dataValues;
    let cart = await Cart.findOne({
      where: {
        [Op.and]: [
          { bookId: req.body.bookId },
          { orderId: order.id }
        ]
      }
    })
    if (!cart) {
      cart = await Cart.create({
      orderId: order.id,
      bookId: req.body.bookId,
      price: req.body.price,
      quantity: 1
      })
    } else {
      cart.price = req.body.price;
      cart.quantity += 1
      await cart.save()
    }
    res.json(cart)
  } catch (err) {
    next(err)
  }
})



module.exports = router
