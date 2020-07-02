import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import { loggingIn } from '../../store/user'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledNavContainer } from '../../themes/StyledNavBox'


const StyledLoginContainer = styled(StyledNavContainer)`
  right: 20px;
`

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-row-gap: 5px;
  background-color: ${props => props.theme.colors.light};
  border-radius: 2px;
  button {
    grid-column: 1/3;
  }
  padding: 20px;
  margin-bottom: 10px;

`

export const login = (props) => {
  const [userInput, setUserInput] = useReducer((state, newState) => ({
    ...state, ...newState
  }), { email: "", password: "" })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.loggingIn(userInput.email, userInput.password)
  }

  const handleChange = (evt) => {
    setUserInput({ [evt.target.name]: evt.target.value })
  }

  return (
    <StyledLoginContainer>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="email">Email </label>
        <input name="email" type="email" onChange={handleChange}></input>
        <label htmlFor="password">Password </label>
        <input name="password" type="password" onChange={handleChange}></input>
        <button type="submit">Login</button>
      </StyledForm>
      {props.error && props.error.response && <div>{props.error.response.data} </div>}
      <div>If you have not signed up for our services yet, please <Link to="/signup"><span>sign up</span> </Link> first.</div>
    </StyledLoginContainer>
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
