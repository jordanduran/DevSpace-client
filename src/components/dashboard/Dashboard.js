import React from 'react';
import UsersContext from '../../context/UsersContext';
import { Redirect, Link } from 'react-router-dom';

class Dashboard extends React.Component {
  static contextType = UsersContext;

  handleDeleteUser = () => {
    const { loggedInUser } = this.context;
    fetch(`https://stormy-crag-28024.herokuapp.com/api/users/${loggedInUser.id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(data => data)
      .catch(err => {
        console.log(err);
      });
    this.context.setLoggedInUser(null, 'Logged out');
    this.props.history.push('/');
  };

  render() {
    if (!this.context.loggedInUser) {
      return <Redirect to='/' />;
    }
    return (
      <section className='container'>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome{' '}
          {this.context.loggedInUser.name}
        </p>
        <div className='dash-buttons'>
          <Link to='/edit-profile' className='btn btn-light'>
            <i className='fas fa-user-circle text-primary'></i> Edit Profile
          </Link>
        </div>

        <h2 className='my-2'>Information</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th className='hide-sm'>Website</th>
              <th className='hide-sm'>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.context.loggedInUser.company}</td>
              <td className='hide-sm'>{this.context.loggedInUser.website}</td>
              <td className='hide-sm'>{this.context.loggedInUser.location}</td>
            </tr>
          </tbody>
        </table>
        <div className='my-2'>
          <button
            className='btn btn-danger'
            onClick={() => {
              this.handleDeleteUser();
            }}
          >
            <i className='fas fa-user'></i> Delete My Account
          </button>
        </div>
      </section>
    );
  }
}

export default Dashboard;
