const { db, User, Book, Author, Genre, Inventory, Order, Cart} = require('../server/db/index')

const users = require('./users')
const books = require('./books')
const authors = require('./authors')

const genres = require('./genres')
const inventories = require('./inventories')
const booksAuthors = require('./books-authors')
const booksGenres = require('./books-genres')


async function runSeed() {
  try {
    await db.sync({ force: true })
    console.log("DB cleaned & synced")

    await Promise.all(users.map(async user => await User.create(user)))
    console.log("users created")

    // chaining the promises in reduce allows to keep the order of the books as they are created
    // this allows us to seed the through tables with correct keys
    await books.reduce(async (previousPromise, nextBook) => {
      await previousPromise;
      console.log("nextBook", nextBook);
      return Book.create(nextBook)
    }, Promise.resolve())
    console.log("books created")

    await authors.reduce(async (previousPromise, nextAuthor) => {
      await previousPromise;
      return Author.create(nextAuthor)
    }, Promise.resolve())
    console.log("authors created")

    await genres.reduce(async (previousPromise, nextGenre) => {
      await previousPromise;
      return Genre.create(nextGenre)
    }, Promise.resolve())
    console.log("genres created")

    await Promise.all(inventories.map(async inventory => await db.models.inventory.create(inventory)))
    console.log("inventories created")

    console.log(db.models["book-author"])


    await Promise.all(booksAuthors.map(async bookAuthor => await db.models["book-author"].create(bookAuthor)))
    console.log("Book Author relationship established")


    await Promise.all(booksGenres.map(async bookGenre => await db.models["book-genre"].create(bookGenre)))
    console.log("Book Genre relationship established")




    console.log("Seeded successfully")

  } catch (err) {
    console.error(err)
  } finally {
    await db.close()
    console.log('db connection closed')
  }
}

// execute the seed function
if (module === require.main) {
  runSeed()
}

// export for testing purposes
module.exports = runSeed
