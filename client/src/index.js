import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from '@apollo/client';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});
const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});
const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({ 
  cache: new InMemoryCache(),
  //uri: 'http://localhost:50786',
  link : link,
  onError: (e) => { console.log(e) },
  });

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
