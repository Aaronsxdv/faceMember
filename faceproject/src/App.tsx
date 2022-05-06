import React from 'react';
import User from './components/User'

import Members from './components/Members';
import { BrowserRouter, Route, Routes, Navigate,Link} from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from 'styled-components';
const face = require('./media/newFace.png');


const StApp = styled.div`
  text-align: center;
  background-color : #384250;
  margin-top:0;
`
const NewFace = {
  Person : styled.h1`
    margin-top:0;
    font-weight: 300;
    font-size:32px;
  `,
  Span : styled.span`
    display: inline-block;
  `,
  Img : styled.img `
    width:22px;
    height:22px;
    vertical-align:middle;  
    margin-right: 5px;
  `,
  BtnFaceAdd : styled.button`
  border: 1px solid rgba(255, 255, 255, .3);
  border-radius: 4px;
  background-color: transparent;
  font-size: 12px;
  font-family:Montserrat,sans-serif;
  font-weight: 300;
  color:rgba(255, 255, 255, .8);
  padding: 5px 10px;
  `,
  ButtonCont : styled.div`
    margin-top : 10vh;
    text-align: center;
  `
}


const App : React.FC = () => {
  return (
    <StApp>
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            
            <NewFace.ButtonCont>
              <NewFace.Person>Detected person</NewFace.Person>
              <Link to='/add'><NewFace.BtnFaceAdd><NewFace.Img src={face}/>ADD FACE TO EXISTING MEMBER</NewFace.BtnFaceAdd></Link>
            </NewFace.ButtonCont>
            
          } />
          <Route path="/add" element={<Members/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </StApp>
  );
}

export default App;
