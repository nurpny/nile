import styled from 'styled-components'

const StyledNavBox = styled.section`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 30;
  max-width: 300px;
  background-color: ${props => props.theme.colors.navDropDown};
  padding: 10px;
  border-radius: 2px;
`

export default StyledNavBox;
