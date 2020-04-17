const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

// const User = db.define('user', {
//   email: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false
//   },
//   password: {
//     type: Sequelize.STRING,
//     // Making `.password` act like a func hides it when serializing to JSON.
//     // This is a hack to get around Sequelize's lack of a "private" option.
//     get() {
//       return () => this.getDataValue('password')
//     }
//   },
//   salt: {
//     type: Sequelize.STRING,
//     // Making `.salt` act like a function hides it when serializing to JSON.
//     // This is a hack to get around Sequelize's lack of a "private" option.
//     get() {
//       return () => this.getDataValue('salt')
//     }
//   },
//   googleId: {
//     type: Sequelize.STRING
//   }
// })

// module.exports = User

// /**
//  * instanceMethods
//  */
// User.prototype.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password()
// }

// /**
//  * classMethods
//  */
// User.generateSalt = function() {
//   return crypto.randomBytes(16).toString('base64')
// }

// User.encryptPassword = function(plainText, salt) {
//   return crypto
//     .createHash('RSA-SHA256')
//     .update(plainText)
//     .update(salt)
//     .digest('hex')
// }

// /**
//  * hooks
//  */
// const setSaltAndPassword = user => {
//   if (user.changed('password')) {
//     user.salt = User.generateSalt()
//     user.password = User.encryptPassword(user.password(), user.salt())
//   }
// }

// User.beforeCreate(setSaltAndPassword)
// User.beforeUpdate(setSaltAndPassword)
// User.beforeBulkCreate(users => {
//   users.forEach(setSaltAndPassword)
// })



const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  },
  salt : {
    type: Sequelize.STRING,
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
    console.log("userJSON in USER MODEL", userJSON)
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

