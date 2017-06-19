import React, { Component } from 'react';
import { Route,  Switch } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Welcome from './Welcome'
import AllMemes from './AllMemes'
import Create from './Create'
import NavigationBar from './NavigationBar'
import requireAuth from './requireAuth'
// import './App.css';
// import Component1 from './Component1';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar/>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/welcome' component={requireAuth(Welcome)} />
          <Route path='/memes' component={requireAuth(Welcome)} />
          <Route path='/all-memes' component={requireAuth(AllMemes)} />
          <Route path='/create' component={requireAuth(Create)} />
          <Route render={() => <h3>No Match</h3>} />
        </Switch>
      </div>
    );
  }
}

export default App;
