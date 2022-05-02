import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html{
    margin-top: 0;
  }
  body {
    margin: 0;
    background-color: #384250;
    font-family:Montserrat, sans-serif;
    color: #FFFFFF;
  }
`

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  
    <GlobalStyle/>
    <App />
  
  </React.StrictMode>
);

