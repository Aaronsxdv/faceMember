import React from 'react';
import styled from 'styled-components';
interface UserProps {
  imgLink: string;
  watchlist: string;
  fullName: string;
}


const StyledUser = {
  Tr : styled.tr`
  `,
  MemberInput : styled.input`
    
  `,
  Image : styled.img`
    width:30%;
    height:30%;
  `,
  Td : styled.td`
    font-family: Montserrat,sans-serif;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
  
  `
}
function User(props:UserProps){
  return (
      <StyledUser.Tr>
        <StyledUser.Td>
          <StyledUser.MemberInput type="radio" name="radios" id="radio1"/>
          <label htmlFor="radio1"><StyledUser.Image src={props.imgLink} alt="Link is broken:(" /></label>
        </StyledUser.Td>
        <StyledUser.Td>{props.fullName}</StyledUser.Td>
        <StyledUser.Td>{props.watchlist}</StyledUser.Td>
      </StyledUser.Tr>
  );
}

export default User;
