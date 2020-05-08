import styled from 'styled-components'

const StyledContainer = styled.section`
display: flex;
background-color: ${props => props.theme.colors.light};
border: 1px solid ${props => props.theme.colors.border};
border-radius: 5px;
padding: 20px;
margin-top: 10px;
`

const StyledLeftContainer = styled(StyledContainer)`
min-width: 60%;
max-width: 100%;
margin: 10px 25px 10px 20px;
display: grid;
`

const StyledRightContainer = styled(StyledContainer)`
    min-width: 30%;
    max-width: 100%;
    margin: 10px 20px 10px 25px;
`

const StyledFlexContainer = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 80vh;
    min-width: 80vh;
`

export {StyledLeftContainer, StyledRightContainer, StyledContainer, StyledFlexContainer}
