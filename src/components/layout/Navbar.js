import React from 'react';
import { Link } from 'react-router-dom';
import UsersContext from '../../context/UsersContext';

class Navbar extends React.Component {
  static contextType = UsersContext;
  render() {
    return (
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code'></i> DevSpace
          </Link>
        </h1>
        <ul>
          <li>
            <Link to='/developers'>Developers</Link>
          </li>
          {this.context.loginMessage === 'Logged in!' ? (
            <>
              <li>
                <a href='login.html' title='Logout' onClick={
                  (e) => {
                    e.preventDefault()
                    this.context.setLoggedInUser(null, 'loggedOut')
                    this.props.history.push('/')
                  }
                }>
                  <i className='fas fa-sign-out-alt'></i>
                  <span className='hide-sm'>Logout</span>
                </a>
              </li>
              <li>
                <Link to='/dashboard' title='Dashboard'>
                  <i className='fas fa-user'></i>
                  <span className='hide-sm'>Dashboard</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/register'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </>
          )}

          <li>
            <Link to='/posts'>Posts</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
