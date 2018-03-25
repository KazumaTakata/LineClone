import { AppRegistry } from 'react-native';
import React, { Component } from "react";
import App from "./main"
import { Provider } from 'react-redux';
import store from "./redux/index"

class App1 extends Component {
    render() {
        return (
            <Provider store={store}>
                  <App />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject2', () => App1);
