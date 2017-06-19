import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './actions';
import './NavigationBar.css'

class NavigationBar extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const userLinks = (
      <div className="nav navbar-nav navbar-right">
        <button className="logout-button" onClick={this.logout.bind(this)}>Logout</button>
        <Link to="/creatememe">
          <button className="create-button">Create a Meme</button>
        </Link>
      </div>
    );

    const guestLinks = (
        <div className="nav navbar-nav navbar-right">
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Login</Link>
        </div>
    );

    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              {this.props.auth ? userLinks : guestLinks}
            </div>
          </div>
        </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.isAuthenticated
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);