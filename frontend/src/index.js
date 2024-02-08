import React from 'react';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

const appTarget = document.getElementById("root");


ReactModal.setAppElement(appTarget)
ReactDOM.render(<App />, appTarget)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
