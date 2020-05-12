import styled from 'styled-components';

const StyledFormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-row-gap: 5px;
  background-color: ${props => props.theme.colors.light};
  border-radius: 2px;
  padding: 20px;
  margin-bottom: 10px;

`

export {StyledFormContainer}
