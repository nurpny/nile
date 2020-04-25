const db = require('./db')
const User = require('./models/User')

const Book = require('./models/Book')
const Author = require('./models/Author')
//const Publisher = require('./models/Publisher')
const Inventory = require('./models/Inventory')
const Genre = require('./models/Genre')

const Order = require('./models/Order')
const Cart = require('./models/Cart')


// Define associations here
Book.hasOne(Inventory)
Inventory.belongsTo(Book)

Book.belongsToMany(Author, {through: "book-author"})
Author.belongsToMany(Book, {through: "book-author"})

Book.belongsToMany(Genre, {through: "book-genre"})
Genre.belongsToMany(Book, {through: "book-genre"})

Book.belongsToMany(Order, {through: Cart})
Order.belongsToMany(Book, {through: Cart})

Book.hasMany(Cart)
Cart.belongsTo(Book)

Order.hasMany(Cart)
Cart.belongsTo(Order)

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {db, User, Book, Author,  Inventory, Genre, Order, Cart}
