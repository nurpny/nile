const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  isbn: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: /^[0-9]{10}$|^[0-9]{13}$/,
      notEmpty: true,
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  abridgedTitle: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
      min: 0
    }
  }
})

// Hooks
const abridgeTitle = (book) => {
  book.abridgedTitle = book.title.toUpperCase().replace(/\bTHE \b|\bA \b|\bAN \b/gi,"")
}

Book.addHook('beforeCreate', 'beforeUpdate', abridgeTitle)

module.exports = Book
