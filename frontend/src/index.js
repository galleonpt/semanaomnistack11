import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(//ele pega no codigo que ta dentro do App(<App /> ) e mete dentro do id root 
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);

