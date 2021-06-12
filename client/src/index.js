import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from '@apollo/client';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  //uri: 'http://localhost:50786',
  uri: 'http://localhost:4000'
})


ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();