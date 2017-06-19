import React, { Component } from 'react';
import axios from 'axios';

class Component1 extends Component {
  componentDidMount() {
    let url = "http://localhost:5000/api/auth/login";
    axios.post(url, {
      username: 'test',
      password: 'test'
    })
      .then(function (response) {
        console.log(response);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('jwtToken', response.data.token);
        // localStorage.getItem('id');
        // localStorage.getItem('token');
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default Component1;