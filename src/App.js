import React, { Component } from 'react'
import WelcomePage from './mainPage/components/WelcomePage';
import SignIn from './loginPage/SignIn';
import Dashboard from './dashboard/Dashboard';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>)
  }
}
export default App