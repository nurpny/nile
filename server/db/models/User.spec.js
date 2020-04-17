const { expect } = require('chai')
const { db, User } = require('../index')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
  after(() => {
    return db.close({force: true})
  })

  it('throws an error if required validation is not met', function (done) {
    User.create({
      email: 'james',
      password: '123',
    }).then(function (result) {
      expect.fail();
      done()
    }).catch(function (err) {
      expect(err['name']).to.be.equal('SequelizeValidationError');
      done()
    })
  })

  describe('correctPassword', () => {
    let james

    beforeEach(async () => {
      james = await User.create({
        email: 'james@gmail.com',
        password: '1234'
      })
    })

    it('returns true if the password is correct', () => {
      expect(james.correctPassword('1234')).to.be.equal(true)
    })

    it('returns false if the password is incorrect', () => {
      expect(james.correctPassword('12345')).to.be.equal(false)
    })
  })

})
