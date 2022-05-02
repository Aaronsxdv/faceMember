import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
const logo = require('../media/back_button.png');

interface Props{
    members : [React.FC];
}

const StyledTopBar = {
    BackImg : styled.img`
      width:10%;
      height:10%;  
      align-self: center;
    `,
    Container : styled.div`
      display:flex;
      flex-direction: row;
      width: 95%;
      margin: 0 auto 1% auto;
      padding:15px 10px;
      border-bottom: 1px solid rgba(255, 255, 255, .3);
    `,
    BackLinkCt : styled.div`
    display:flex;
    flex-direction: row;
    width:50%
    `,  
    Back : styled.h1`
      text-align: center;
      margin:0px 0px 0px 10px;
      font-size: 12px;
      font-family:Montserrat,sans-serif;
      font-weight: 200;
      align-self: center;
    `,
    BackLink : styled.div`
    width:30%
    align-self: center
    `,
    Header : styled.h1`
    position:absolute;
    text-align: center;
    left:20%;
    right:20%;
    align-self: center;
    margin:0;
    font-size: 22px;
    font-weight: 300;
    `,
    StyledLink : styled(Link)`
      color:white;

      text-decoration: none;
    `
}

const TopBar : React.FC = () => {
  return (
    <StyledTopBar.Container>
      <StyledTopBar.BackLink>
        <StyledTopBar.StyledLink to='/'>
          <StyledTopBar.BackLinkCt>
            <StyledTopBar.BackImg src={logo}/>
            <StyledTopBar.Back>BACK</StyledTopBar.Back>
          </StyledTopBar.BackLinkCt>
        </StyledTopBar.StyledLink>
      </StyledTopBar.BackLink>
        <StyledTopBar.Header>Add face to existing member</StyledTopBar.Header>
    </StyledTopBar.Container>
  );
}
;
export default TopBar;