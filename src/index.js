import React from 'react';
import ReactDOM from 'react-dom/client';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

import App from './components/App';

import createRootReducer from './reducers';
import { doInit } from './actions/auth';
import { createHashHistory } from 'history';

// Amplify setup
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

// Amplify Auth UI
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';




const history = createHashHistory();

export function getHistory() {
    return history;
}

// Set Axios defaults
axios.defaults.baseURL = config.baseURLApi;
axios.defaults.headers.common['Content-Type'] = "application/json";
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

export const store = createStore(
    createRootReducer(history),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            ReduxThunk
        ),
    )
);

// Init Redux auth state
store.dispatch(doInit());

// Wrap your App with Amplify Authenticator
const AuthenticatedApp = withAuthenticator(App);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <AuthenticatedApp />
    </Provider>
);

// Service worker
serviceWorker.unregister();



// // Import all dependencies first, before anything else
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { routerMiddleware } from 'connected-react-router';
// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux';
// import ReduxThunk from 'redux-thunk';
// import * as serviceWorker from './serviceWorker';
// import axios from 'axios';

// import App from './components/App';
// import createRootReducer from './reducers';
// import { doInit } from './actions/auth';
// import { createHashHistory } from 'history';

// // Amplify setup imports
// import { Amplify } from 'aws-amplify';
// import config from './aws-exports';
// import '@aws-amplify/ui-react/styles.css';
// import { withAuthenticator } from '@aws-amplify/ui-react';

// // Setting up the history and axios defaults (these go after the imports)
// const history = createHashHistory();

// export function getHistory() {
//     return history;
// }

// // Set Axios defaults
// axios.defaults.baseURL = config.baseURLApi;
// axios.defaults.headers.common['Content-Type'] = "application/json";
// const token = localStorage.getItem('token');
// if (token) {
//     axios.defaults.headers.common['Authorization'] = "Bearer " + token;
// }

// // Create Redux store and apply middlewares
// export const store = createStore(
//     createRootReducer(history),
//     compose(
//         applyMiddleware(
//             routerMiddleware(history),
//             ReduxThunk
//         ),
//     )
// );

// // Init Redux auth state
// store.dispatch(doInit());

// // Wrap your App with Amplify Authenticator
// const AuthenticatedApp = withAuthenticator(App);

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <Provider store={store}>
//         <AuthenticatedApp />
//     </Provider>
// );

// // Service worker
// serviceWorker.unregister();



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { routerMiddleware } from 'connected-react-router';
// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux';
// import ReduxThunk from 'redux-thunk';
// import * as serviceWorker from './serviceWorker';
// import axios from 'axios';

// import App from './components/App';

// import createRootReducer from './reducers';
// import { doInit } from './actions/auth';
// import { createHashHistory } from 'history';

// // Amplify setup
// import { Amplify } from 'aws-amplify';
// import config from './aws-exports';
// Amplify.configure(config);

// // Amplify Auth UI
// import '@aws-amplify/ui-react/styles.css';
// import { withAuthenticator } from '@aws-amplify/ui-react';




// const history = createHashHistory();

// export function getHistory() {
//     return history;
// }

// // Set Axios defaults
// axios.defaults.baseURL = config.baseURLApi;
// axios.defaults.headers.common['Content-Type'] = "application/json";
// const token = localStorage.getItem('token');
// if (token) {
//     axios.defaults.headers.common['Authorization'] = "Bearer " + token;
// }

// export const store = createStore(
//     createRootReducer(history),
//     compose(
//         applyMiddleware(
//             routerMiddleware(history),
//             ReduxThunk
//         ),
//     )
// );

// // Init Redux auth state
// store.dispatch(doInit());

// // Wrap your App with Amplify Authenticator
// const AuthenticatedApp = withAuthenticator(App);

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <Provider store={store}>
//         <AuthenticatedApp />
//     </Provider>
// );

// // Service worker
// serviceWorker.unregister(); 



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { routerMiddleware } from 'connected-react-router';
// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux'
// import ReduxThunk from 'redux-thunk'
// import * as serviceWorker from './serviceWorker';
// import axios from 'axios';

// import App from './components/App';
// import config from './config';
// import createRootReducer from './reducers';
// import { doInit } from './actions/auth';
// import { createHashHistory } from 'history';

// const history = createHashHistory();

// export function getHistory() {
//     return history;
// }

// axios.defaults.baseURL = config.baseURLApi;
// axios.defaults.headers.common['Content-Type'] = "application/json";
// const token = localStorage.getItem('token');
// if (token) {
//     axios.defaults.headers.common['Authorization'] = "Bearer " + token;
// }

// export const store = createStore(
//     createRootReducer(history),
//     compose(
//         applyMiddleware(
//             routerMiddleware(history),
//             ReduxThunk
//         ),
//     )
// );

// store.dispatch(doInit());

// const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
