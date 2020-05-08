const Sequelize = require('sequelize')
const db = require('../db')

const states = ["AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

const taxRates = {AL:0.0400, AK:0.0000, AZ:0.0560, AR:0.0650, CA:0.0725, CO:0.0290, CT:0.0635, DE:0.0000, DC:0.0600, FL:0.0600, GA:0.0400, HI:0.0400, ID:0.0600, IL:0.0625, IN:0.0700, IA:0.0600, KS:0.0650, KY:0.0600, LA:0.0445, ME:0.0550, MD:0.0600, MA:0.0625, MI:0.0600, MN:0.0688, MS:0.0700, MO:0.0423, MT:0.0000, NE:0.0550, NV:0.0685, NH:0.0000, NJ:0.0663, NM:0.0513, NY:0.0400, NC:0.0475, ND:0.0500, OH:0.0575, OK:0.0450, OR:0.0000, PA:0.0600, RI:0.0700, SC:0.0600, SD:0.0450, TN:0.0700, TX:0.0625, UT:0.0485, VT:0.0600, VA:0.0430, WA:0.0650, WV:0.0600, WI:0.0500, WY:0.0400}

const Order = db.define('order', {
  SessionID: {
    type: Sequelize.STRING
  },
  grossCost: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  shippingCost: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  tax: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  total: {
    type: Sequelize.INTEGER,
  },
  dateCompleted: {
    type: Sequelize.DATE,
  },
  shippingAddress: {
    type: Sequelize.STRING,
  },
  shippingCity: {
    type: Sequelize.STRING,
  },
  shippingState: {
    type: Sequelize.ENUM(states)
  },
  zipCode: {
    type: Sequelize.STRING,
    validate: {
      is: /^\d{5}$/
    }
  }
})

const updateTotal = (order => {
  if (order.grossCost > 0) {
    if (order.grossCost < 4000) {
      order.shippingCost = 800
    } else {
      order.shippingCost = 0
    }
    if (order.shippingState) {
      order.tax = Math.round(order.grossCost * taxRates[order.shippingState])
    }
    order.total = order.grossCost + order.tax + order.shippingCost
  }
})

Order.addHook('beforeSave', 'beforeUpdate', updateTotal)

module.exports = Order
