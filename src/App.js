import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';
import Login from './Login.js'
import Search from './Search.js'
import { readCookie } from './CookieUtils.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/search" component={Search} />
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated() == true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

function isAuthenticated() {
  if (readCookie('isAuthenticated') == 'true') {
    console.log('yes');
    return true
  }
}

export default App;
