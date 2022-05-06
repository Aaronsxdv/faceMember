import React from 'react';
import styled from 'styled-components';
interface UserProps {
  imgLink: string;
  watchlist: string;
  fullName: string;
  key: number;
}


const StyledUser = {
  Tr : styled.tr`
    &:hover {
      background-color: #353F4C;
    }
  `,
  MemberInput : styled.input`
    appearance: none;
    background-color: transparent;
    margin: 0 5% 10% 0;
    font: inherit;
    color: red;
    width: 1.15em;
    height: 1.15em;
    border: 2px solid white;
    border-radius: 50%;
    &:hover{
      background-color: #CCCCCC;
    }
    &:checked{
      background-color: transparent;
      border: 0.33em solid #8EECD8;
    }
  `,
  Image : styled.img`
    width:20%;
    height:20%;
    border-radius:5px;
  `,
  Td : styled.td`
    font-family: Montserrat,sans-serif;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
    text-align: center;
    font-size:16px;
    @media (max-width: 768px){
      font-size:12px;
    }
  `
}
function User(props:UserProps){
  return (
      <StyledUser.Tr>
        <StyledUser.Td>
          <StyledUser.MemberInput type="radio" name="radios" value={props.imgLink}/>
          
          <label htmlFor="radio1"><StyledUser.Image src={props.imgLink} alt="Link is broken" /></label>
        </StyledUser.Td>
        <StyledUser.Td>{props.fullName}</StyledUser.Td>
        <StyledUser.Td>{props.watchlist}</StyledUser.Td>
      </StyledUser.Tr>
  );
}

export default User;
