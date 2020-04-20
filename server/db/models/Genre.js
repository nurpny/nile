const Sequelize = require('sequelize')
const db = require('../db')


const Genre = db.define('genre', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
})

module.exports = Genre
