import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  render() {
    return (
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Developer Space</h1>
            <p className='lead'>
              A space where developers can create a profile/portfolio, share
              posts and get help from other developers
            </p>
            {localStorage.getItem('userId') ? (
              <div className='buttons'>
                <Link to='/Dashboard' className='btn btn-primary'>
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className='buttons'>
                <Link to='/register' className='btn btn-primary'>
                  Sign Up
                </Link>
                <Link to='/login' className='btn btn-light'>
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Landing;
