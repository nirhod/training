import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { combinedReducers } from './reducers';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
// tslint:disable
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

const history = createHistory();
const router = routerMiddleware(history);
const store = createStore(combinedReducers, {}, composeWithDevTools(applyMiddleware(router)));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
