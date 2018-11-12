import React, { Component } from 'react'
import WelcomePage from './mainPage/components/WelcomePage';
import SignIn from './loginPage/SignIn';
import Channel from './dashboard/ChannelPage';
import Dashboard from './dashboard/Dashboard';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store} >
        <Router>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/channel/:id" component={Channel} />
          </Switch>
        </Router>
      </Provider>)
  }
}
export default App