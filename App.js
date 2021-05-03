  
import React, { Component } from 'react';

import { Provider } from "mobx-react";
import Router from './src/Router';
import NavigationService from './src/NavigationService.js'
import store from './src/store/index';
export default class App extends Component {
  render() {

    return (
      <Provider {...store}>
        <Router
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} />
      </Provider>

    );
  }
}