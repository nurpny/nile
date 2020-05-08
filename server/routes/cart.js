const router = require('express').Router()
const { Op } = require("sequelize");


const { Order, Cart, Book } = require('../db/index')


router.get('/', async (req, res, next) => {
  try {
    let order;
    if (req.user) {
      order = await Order.findOne({
        where: {
          userId: req.user.id,
          dateCompleted: null
        }
      })
    } else {
      order = await Order.findOne({
        where: {
          SessionID: req.sessionID,
          dateCompleted: null
        }
      })
    } let cart = []
    if (order) {
      cart = await Cart.findAll({
        where: {
          orderId: order.id
        },
        include: [{
          model: Book,
          attributes: ["bookImageURL", "title"]
        }]
      })
    }
    res.json(cart)
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
          where: {
            userId: req.user.id,
            dateCompleted: null,
          },
          defaults: {
            userId: req.user.id,
            SessionID: req.sessionID
          }
        }
      )
    } else {
      order = await Order.findOrCreate(
        {
          where: {
            SessionID: req.sessionID,
            dateCompleted: null
          },
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
