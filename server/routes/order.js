const router = require('express').Router()

const { Order } = require('../db/index')


router.put('/grossCost', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.body.orderId,
       { attributes:
        {exclude: ['sessionID', 'userId']}
       });
    order.grossCost = parseInt(req.body.subtotal, 10);
    await order.save();

    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/shipping', async (req, res, next) => {
  try {
    let {orderId, address, city, state, zipCode} = req.body
    let order = await Order.findByPk(orderId,
      { attributes:
       {exclude: ['sessionID', 'userId']}
      });
    order.shippingAddress = address;
    order.shippingCity = city;
    order.shippingState = state;
    order.zipCode = zipCode;
    await order.save();
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/complete', async (req, res, next) => {
  try {
    let {orderId} = req.body
    let order = await Order.findByPk(orderId,
      { attributes:
       {exclude: ['sessionID', 'userId']}
      });
    order.dateCompleted = new Date();
    await order.save();
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
