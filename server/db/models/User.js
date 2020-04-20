const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
    unique: true,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[2-9]\d{2}-\d{3}-\d{4}$/i
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  salt : {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {defaultScope:{
  attributes: { exclude: ['password', 'salt']}
}}
)

User.addScope('includeEverything', {
    attributes: {include: ['password', 'salt']}
})


// Instance methods
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

// Class methods
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(userPassword, salt) {
  return crypto
   .createHash('SHA256')
   .update(userPassword)
   .update(salt)
   .digest('hex')
}

User.verifyPassword = async function (userEmail, candidatePwd) {
  const user = await this.scope('includeEverything').findOne({where: {email: userEmail}})
  if (user.correctPassword(candidatePwd)) {
    let userJSON = {id: user.id, email: user.email}
    return userJSON
  }
}

// Hooks
const setSaltPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.addHook('beforeCreate', 'beforeUpdate', setSaltPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltPassword)
})


module.exports = User

