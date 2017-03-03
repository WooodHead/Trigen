/**
  * Global entry point to the app
  *
  * @namespace AppEntryPoint
  */

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

// Styles
import 'sanitize.css/sanitize.css';
import './global-styles';

import store from './store';
import routes from './routes';


const rootElement = document.getElementById('root');
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store;

if(process.env.NODE_ENV === 'production') {
  store = createStore(store, applyMiddleware(promise, thunk));
}else {
  store = createStore(store, composeEnhancers(applyMiddleware(promise, thunk)));
}

ReactDom.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  rootElement
);
