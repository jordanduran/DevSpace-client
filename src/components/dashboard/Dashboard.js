import React from 'react';
import UsersContext from '../../context/UsersContext';
import { Redirect, Link } from 'react-router-dom';
import config from '../../config';

class Dashboard extends React.Component {
  state = {
    user: {}
  };

  static contextType = UsersContext;

  handleDeleteUser = () => {
    fetch(
      `${config.API_ENDPOINT}/api/users/${localStorage.getItem('userId')}`,
      {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(data => data)
      .catch(err => {
        console.log(err);
      });
    this.context.setLoggedInUser(null, 'Logged out');
    this.props.history.push('/');
  };

  componentDidMount = () => {
    fetch(`${config.API_ENDPOINT}/api/users`)
      .then(res => res.json())
      .then(users => {
        this.context.setUsers(users);
        const loggedInUser = users.filter(
          user => user.id === parseInt(localStorage.getItem('userId'), 10)
        )[0];
        this.setState({
          user: loggedInUser
        });
        return users;
      })
      .catch(err => console.log(err));
  };

  render() {
    if (!localStorage.getItem('user')) {
      return <Redirect to='/' />;
    }

    const user = this.state.user;
    return (
      <section className='container'>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome {user.name}
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
              <td>{user.company}</td>
              <td className='hide-sm'>{user.website}</td>
              <td className='hide-sm'>{user.location}</td>
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
