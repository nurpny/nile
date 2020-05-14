import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import { StyledContainer } from '../themes/StyledContainer'
import styled from 'styled-components';
import { signingUp } from '../store/user';


const StyledSignupSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const StyledSignUpContainer = styled(StyledContainer)`
  width: 500px;
`
const StyledSignupForm = styled.form`
  display: flex;
  flex-direction: column;
  input{
    width: 450px;
    margin-bottom: 10px;
  }
  button{
    align-self: center;
  }
  h3{
    align-self: center;
  }
`
export const Signup = (props) => {
  const [userInput, setUserInput] = useReducer((state, newState) => ({
    ...state, ...newState
  }), { firstName: "", lastName: "", email: "", phone: "", password: "" })

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await props.signingUp(userInput.firstName, userInput.lastName, userInput.email, userInput.phone, userInput.password, props.history)
  }

  const handleChange = (evt) => {
    setUserInput({ [evt.target.name]: evt.target.value })
  }


  return (
    <StyledSignupSection>
      <StyledSignUpContainer>
        <StyledSignupForm onSubmit={handleSubmit}>
          <h3>Create Account</h3>
          <div> <label htmlFor="firstName">First Name </label> </div>
          <div> <input name="firstName" type="text" onChange={handleChange} required='required'></input> </div>
          <div> <label htmlFor="lastName">Last Name </label> </div>
          <div> <input name="lastName" type="text" onChange={handleChange} required='required'></input>  </div>
          <div> <label htmlFor="email">Email </label> </div>
          <div>  <input name="email" type="email" onChange={handleChange} required='required'></input>
          </div>
          <div> <label htmlFor="phone">Phone <small> xxx-xxx-xxxx</small> </label> </div>
          <div>  <input name="phone" type="text" onChange={handleChange} required='required' pattern="[2-9]\d{2}-\d{3}-\d{4}"></input>

          </div>
          <div> <label htmlFor="password">Password </label> </div>
          <div> <input name="password" type="password" onChange={handleChange} required='required'></input> </div>
          <button type="submit">Create Your Account</button>
        </StyledSignupForm>
        <div>{props.user.error && props.user.error.response.data}</div>
      </StyledSignUpContainer>
    </StyledSignupSection>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  signingUp: (firstName, lastName, email, phone, password, history) => dispatch(signingUp(firstName, lastName, email, phone, password, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
