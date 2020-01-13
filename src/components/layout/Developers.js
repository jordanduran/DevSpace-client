import React from 'react';
import { Link } from 'react-router-dom';
import UsersContext from '../../context/UsersContext';

class Developers extends React.Component {
  static contextType = UsersContext;

  renderUsers = () => {
    const { users } = this.context;
    return users.map(user => {
      return (
        <div className='profile bg-light' key={user.id}>
          <img className='round-img' src={user.avatar} alt='' />
          <div>
            <h2>{user.name}</h2>
            <p>{user.company}</p>
            <p>{user.location}</p>
            <Link to={`/profile/${user.id}`} className='btn btn-primary'>
              View Profile
            </Link>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <section className='container'>
        <h1 className='large text-primary'>Developers</h1>
        <p className='lead'>
          <i className='fab fa-connectdevelop'></i> Browse and connect with
          developers
        </p>
        <div className='profiles'>{this.renderUsers()}</div>
      </section>
    );
  }
}

export default Developers;
