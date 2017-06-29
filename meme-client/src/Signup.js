import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { signup } from './actions' 


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state)
    .then(() =>
      this.props.history.push('/login')    
    )
    .catch(function(error) {
       console.log(error);
    });
  }

  render() {
    return (
    <div>
       <form onSubmit={this.handleSubmit}>
        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>  
        <input name="password" type="text" value={this.state.password} onChange={this.handleChange}/>  
        <input type="submit" value="Signup"/>  
      </form>
    </div>
    )
  }
}

export default connect(null, {signup})(Signup);