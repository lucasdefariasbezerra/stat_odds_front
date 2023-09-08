import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/main/routes';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import reducers from './components/main/reducers';
import LoginManagement from './components/login/loginManagement';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools);

ReactDOM.render(
<Provider store={store}>
    <LoginManagement />
</Provider>
, document.getElementById('app'));