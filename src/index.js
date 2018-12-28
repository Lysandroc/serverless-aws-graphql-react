import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from  'aws-amplify'
import './index.css';
import App from './App';
import awsmobile from './aws-exports';
import * as serviceWorker from './serviceWorker';

Amplify.configure(awsmobile);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
