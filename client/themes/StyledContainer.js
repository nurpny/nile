import styled from 'styled-components'

const StyledContainer = styled.section`
display: flex;
flex-direction: column;
background-color: ${props => props.theme.colors.light};
border: 1px solid ${props => props.theme.colors.border};
border-radius: 5px;
padding: 20px;
margin-top: 10px;
`

const StyledLeftContainer = styled(StyledContainer)`
    width: 60%;
    margin: 10px 25px 10px 20px;
    @media only screen and (max-width: 900px) {
         width: 100%;
    }
`

const StyledRightContainer = styled(StyledContainer)`
    width: 30%;
    margin: 10px 20px 10px 25px;
    @media only screen and (max-width: 900px) {
         width: 100%;
    }
`

const StyledFlexContainer = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 70vh;
    min-width: 80vw;
`

export { StyledLeftContainer, StyledRightContainer, StyledContainer, StyledFlexContainer }
