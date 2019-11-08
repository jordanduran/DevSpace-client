import React from 'react';
import PropTypes from 'prop-types';
import UsersContext from '../../context/UsersContext';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
  static contextType = UsersContext;
  render() {
    if(!this.context.loggedInUser) {
      return <Redirect to='/' />
    }
      return (
  <section className='container'>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
      <i className='fas fa-user'></i> Welcome {this.context.loggedInUser.name}
    </p>
    <div className='dash-buttons'>
      <a href='edit-profile.html' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </a>
      <a href='add-experience.html' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary'></i> Add Experience
      </a>
      <a href='add-education.html' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary'></i> Add Education
      </a>
    </div>

    <h2 className='my-2'>Experience Credentials</h2>
    <table className='table'>
      <thead>
        <tr>
          <th>Company</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tech City</td>
          <td>
            <button className='btn btn-danger'>Delete</button>
          </td>
        </tr>
        <tr>
          <td>Tech Media</td>
          <td>
            <button className='btn btn-danger'>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 className='my-2'>Education Credentials</h2>
    <table className='table'>
      <thead>
        <tr>
          <th>School</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Northern Essex</td>
          <td>
            <button className='btn btn-danger'>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div className='my-2'>
      <button className='btn btn-danger'>
        <i className='fas fa-user-minus'></i>
        Delete My Account
      </button>
    </div>
  </section>
      )
  }
};

export default Dashboard