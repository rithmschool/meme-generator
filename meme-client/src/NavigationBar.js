import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './actions';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/memes">Current Memes</Link></li>
        <li><Link to="/all-memes">Create Memes</Link></li>
        <li><a href="/" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">Meme Generator App</Link>
            </div>
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

