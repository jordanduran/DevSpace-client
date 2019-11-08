import React from 'react';
import UsersContext from '../../context/UsersContext';

class Developers extends React.Component {
  static contextType = UsersContext;

  renderUsers = () => {
    const { users } = this.context;
    console.log(users);
    return users.map((user) => {
      return (
        <div className='profile bg-light' key={user.id}>
            <img
              className='round-img'
              src={user.avatar}
              alt=''
            />
            <div>
              <h2>{user.name}</h2>
              <p>{user.company}</p>
              <p>{user.location}</p>
              <a href='profile.html' className='btn btn-primary'>
                View Profile
              </a>
            </div>
          </div>
      )
    })
  }

  render() {
    return (
      <section className='container'>
        <h1 className='large text-primary'>Developers</h1>
        <p className='lead'>
          <i className='fab fa-connectdevelop'></i> Browse and connect with
          developers
        </p>
        <div className='profiles'>
          {this.renderUsers()}
        </div>
      </section>
    );
  }
}

export default Developers;
