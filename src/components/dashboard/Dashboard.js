import React from 'react';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {
  render() {
      return (
  <section class='container'>
    <h1 class='large text-primary'>Dashboard</h1>
    <p class='lead'>
      <i class='fas fa-user'></i> Welcome John Doe
    </p>
    <div class='dash-buttons'>
      <a href='edit-profile.html' class='btn btn-light'>
        <i class='fas fa-user-circle text-primary'></i> Edit Profile
      </a>
      <a href='add-experience.html' class='btn btn-light'>
        <i class='fab fa-black-tie text-primary'></i> Add Experience
      </a>
      <a href='add-education.html' class='btn btn-light'>
        <i class='fas fa-graduation-cap text-primary'></i> Add Education
      </a>
    </div>

    <h2 class='my-2'>Experience Credentials</h2>
    <table class='table'>
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
            <button class='btn btn-danger'>Delete</button>
          </td>
        </tr>
        <tr>
          <td>Tech Media</td>
          <td>
            <button class='btn btn-danger'>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 class='my-2'>Education Credentials</h2>
    <table class='table'>
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
            <button class='btn btn-danger'>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class='my-2'>
      <button class='btn btn-danger'>
        <i class='fas fa-user-minus'></i>
        Delete My Account
      </button>
    </div>
  </section>
      )
  }
};

export default Dashboard