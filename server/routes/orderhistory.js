const router = require('express').Router()
const {User, Order} = require('../db/index')
const Op = require('sequelize').Op;

router.get('/', async (req, res, next)=> {
  try {
    if(req.user) {
      const orderHistory = await Order.findAll({
        where: {
          userId: req.user.id,
          dateCompleted: {[Op.not]: null}
        },
        attributes: {exclude: ['sessionID', 'userId']}
      })
      res.send(orderHistory);
    } else {
      res.status(401).send('Available for users only')
    }

  } catch(err) {
    next(err)
  }
})

module.exports = router;
