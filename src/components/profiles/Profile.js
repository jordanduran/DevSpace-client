import React from 'react';
import UsersContext from '../../context/UsersContext';

class Profile extends React.Component {
  static contextType = UsersContext;
  render() {
    const id = parseInt(this.props.match.params.id, 10);
    let user = {};
    if (this.context.users.length !== 0) {
      user = this.context.users.filter(user => user.id === id)[0];
    }
    return (
      <div className='profile-top bg-primary p-2'>
        {!user.avatar ? (
          <img
            className='round-img'
            src='https://gravatar.com/avatar/8385556c89b788059f4edfc82735470a'
            alt=''
          />
        ) : (
          <img className='round-img' src={user.avatar} alt='' />
        )}
        {/* <img className='round-img my-1' src={user.avatar} alt='' /> */}
        <h1 className='large'>{user.name}</h1>
        <p className='lead'>Developer at {user.company}</p>
        <p>{user.location}</p>
        <div className='icons my-1'>
          <a
            href={user.website || ''}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fas fa-globe fa-2x'></i>
          </a>
          <a
            href={user.twitter_url || ''}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-twitter fa-2x'></i>
          </a>
          <a
            href={user.facebook_url || ''}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-facebook fa-2x'></i>
          </a>
          <a
            href={user.linkedin_url || ''}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
          <a
            href={user.youtube_url || ''}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-youtube fa-2x'></i>
          </a>
          <a
            href={user.instagram_url || ''}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        </div>
        <div className='profile-about bg-light p-2'>
          <h2 className='text-primary'>{user.name}'s bio</h2>
          <p>{user.bio}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
