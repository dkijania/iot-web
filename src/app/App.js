import React, { Component } from 'react'
import { WelcomePage } from './guest/welcome';
import { LoginComponent } from './guest/login';
import DashboardLayout from './user/shared/DashboardLayout';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { initialize } from "../utils/firebase";
import { navigation } from './navigation';

class App extends Component {
  constructor() {
    super()
    initialize()
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store} >
        <Router>
          <Switch>
            <Route exact path={navigation.main} component={WelcomePage} />
            <Route exact path={navigation.signIn} component={LoginComponent} />
            <Route exact path={navigation.dashboard} component={DashboardLayout} />
            <Route exact path={navigation.channelId} component={DashboardLayout} />
          </Switch>
        </Router>
      </Provider>)
  }
}
export default App