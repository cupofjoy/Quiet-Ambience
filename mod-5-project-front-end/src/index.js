import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from "redux";
import { Provider } from 'react-redux'
import reducer from './reducers/reducer.js'
import "semantic-ui-css/semantic.css";
import { BrowserRouter as Router } from 'react-router-dom';

// Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history);
//
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
///<Provider store={store}>    </Provider>
