const Sequelize = require('sequelize')
const db = require('../db')

const Inventory = db.define('inventory', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Inventory
