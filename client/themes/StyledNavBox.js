import styled from 'styled-components'

const StyledNavContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 30;
  max-width: 300px;
  background-color: ${props => props.theme.colors.navDropDown};
  padding: 10px;
  border-radius: 2px;
`

const StyledNavInnerContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.light};
  border-radius: 2px;
  padding: 10px;
`

export {StyledNavContainer, StyledNavInnerContainer}
