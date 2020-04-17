const {db, User} = require('../server/db/index')


async function runSeed() {
  try {
    await db.sync({force: true})
    console.log("DB cleaned & synced")
    await User.create({email: "james@email.com", password: '1234'})
    await User.create({email: "matt@email.com", password: '1234'})
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
