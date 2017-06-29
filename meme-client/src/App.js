import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import NavigationBar from './NavigationBar';
import TopMemeList from './TopMemeList';
import ChoosePicture from './ChoosePicture';
import Create from './Create';
import requireAuth from './requireAuth';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <div className="App-header">
          <div className="App-logo" alt="logo">🖌&nbsp; 🖼</div>
          <h2>Welcome to Meme-ify!</h2>
        </div>
        <div className="App-intro">
          <Switch>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/welcome" component={requireAuth(TopMemeList)}/>
            <Route exact path="/creatememe" component={requireAuth(ChoosePicture)}/>
            <Route path="/creatememe/form" component={requireAuth(Create)}/>
            <Route render={() => <h3>No Match</h3>}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
