import React, { Component } from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import { Route,  Switch} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import requireAuth from './requireAuth'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <div className="App-header">
          <h1>Fun with memez</h1>
        </div>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/home' component={requireAuth(Home)} />
          <Route render={() => <h3>No Match</h3>} />
        </Switch>
      </div>
    );
  }
}

export default App;
