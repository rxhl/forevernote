import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDapcvaUcsNrCfpsK17kDSZOPsUNhSrHOA',
  authDomain: 'evernote-63d11.firebaseapp.com',
  databaseURL: 'https://evernote-63d11.firebaseio.com',
  projectId: 'evernote-63d11',
  storageBucket: 'evernote-63d11.appspot.com',
  messagingSenderId: '1041755323361',
  appId: '1:1041755323361:web:245e41e0a0db97b8'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
