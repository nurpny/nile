import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import { loggingIn } from '../store/user'


export const login = (props) => {
  const [userInput, setUserInput] = useReducer((state, newState) => ({...state, ...newState
  }), {email: "", password: ""})

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log("email", userInput.email, "password", userInput.password)
    props.loggingIn(userInput.email, userInput.password)
  }

  const handleChange = (evt) => {
    setUserInput({[evt.target.name]: evt.target.value})
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email </label>
      <input name="email" type="text" placeholder="Email" onChange={handleChange}></input>
      <label htmlFor="password">Password </label>
      <input name="password" type="password" onChange={handleChange}></input>
    <button type="submit">Login</button>
    </form>
    {props.error && props.error.response && <div>{props.error.response.data} </div>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.user.error
})

const mapDispatchToProps = (dispatch) => ({
  loggingIn: (email, password) => dispatch(loggingIn(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(login)
