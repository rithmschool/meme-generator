import React, { Component } from 'react';
// import { saveState } from './modifyingState'
import axios from 'axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { login, setAuthorizationToken } from './actions' 


class Login extends Component {
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
    this.props.login(this.state)
    .then((resp) => {
      localStorage.setItem('id', resp.data.id);
      localStorage.setItem('token', resp.data.token);
      this.props.setAuthorizationToken(resp.data.token);
      // setAuthorizationToken(localStorage.token);
      if (axios.defaults.headers.common['Authorization']) {
        this.props.history.push('/welcome')
      }
    })
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
        <input type="submit" value="Login"/>  
      </form>
    </div>
    )
  }
}

export default connect(null, {login, setAuthorizationToken})(withRouter(Login));