import { AppRegistry } from 'react-native';
import React, { Component } from "react";
import App from "./main"
import { Provider } from 'react-redux';
import store from "./redux/index"
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";


const client = new ApolloClient({ uri: 'http://127.0.0.1:3000/graphql' })

class Root extends Component {
    render() {
        return (
          <ApolloProvider client={client}>
            <Provider store={store}>
                  <App />
            </Provider>
          </ApolloProvider>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject2', () => Root);
