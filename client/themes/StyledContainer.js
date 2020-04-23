import styled from 'styled-components'

const StyledContainer = styled.section`
display: flex;
background-color: ${props => props.theme.colors.light};
border: 1px solid ${props => props.theme.colors.border};
border-radius: 5px;
padding: 20px;
margin-top: 10px;
`

export default StyledContainer;
