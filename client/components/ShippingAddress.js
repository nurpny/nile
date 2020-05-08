import React from 'react';
import styled from 'styled-components';

const StyledAddressContainer = styled.section`
  display: grid;
  grid-template-areas:
   "addrKey addrVal addrVal addrVal addrVal addrVal";
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr;
`
const StyledAddrVal = styled.section`
  grid-area: addrVal;

`

export default function Address(props) {
  let { address, city, state, zipcode } = props;
  return (
    <StyledAddressContainer>
        <div>Address: </div>
        <StyledAddrVal>{address}</StyledAddrVal>
        <div>City:</div>
        <div>{city}</div>
        <div>State:</div>
        <div>{state}</div>
        <div>Zipcode:</div>
        <div>{zipcode}</div>
    </StyledAddressContainer>
  )
}
