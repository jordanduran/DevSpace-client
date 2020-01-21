import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UsersContext from '../../context/UsersContext';
import config from '../../config';

class EditProfile extends React.Component {
  _isMounted = false;
  static contextType = UsersContext;

  constructor(props) {
    super(props);
    this.state = {
      company: '',
      profileUpdated: '',
      website: '',
      location: '',
      bio: '',
      twitter_url: '',
      facebook_url: '',
      youtube_url: '',
      linkedin_url: '',
      instagram_url: ''
    };
  }

  correctifyLink = url => {
    if (url) if (!url.includes('https://')) return `https://${url}`;

    return url;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const id = parseInt(localStorage.getItem('userId'), 10);
    await this.setState({
      twitter_url: this.correctifyLink(this.state.twitter_url),
      facebook_url: this.correctifyLink(this.state.facebook_url),
      youtube_url: this.correctifyLink(this.state.youtube_url),
      linkedin_url: this.correctifyLink(this.state.linkedin_url),
      instagram_url: this.correctifyLink(this.state.instagram_url)
    });
    console.log(this.state.twitter_url);
    await fetch(`${config.API_ENDPOINT}/api/users/${id}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...this.state
      })
    })
      .then(data => data)
      .catch(err => {
        console.log(err);
      });
    const updatedUser = {
      ...this.state
    };
    this.context.setLoggedInUser(updatedUser, 'Logged in!');
    alert('Profile updated!');
  };

  componentDidMount = () => {
    this._isMounted = true;
    return axios
      .get(`${config.API_ENDPOINT}/api/users`)
      .then(data => {
        const loggedInUser = data.data.filter(
          user => user.id === parseInt(localStorage.getItem('userId'), 10)
        )[0];

        if (this._isMounted) {
          this.setState({
            ...loggedInUser
          });
        }
      })
      .catch(error => console.log(error));
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <section className='container'>
        <h1 className='large text-primary'>Edit Your Profile</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Let's get some information to make
          your profile stand out
        </p>
        <form
          className='form'
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='Company'
              name='company'
              value={this.state.company}
              onChange={e => {
                this.setState({ company: e.target.value });
              }}
            />
            <small className='form-text'>
              Could be your own company or one you work for
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Website'
              name='website'
              value={this.state.website}
              onChange={e => {
                this.setState({ website: e.target.value });
              }}
            />
            <small className='form-text'>
              Could be your own or a company website
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={this.state.location}
              onChange={e => {
                this.setState({ location: e.target.value });
              }}
            />
            <small className='form-text'>
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={this.state.bio}
              onChange={e => {
                this.setState({ bio: e.target.value });
              }}
            ></textarea>
            <small className='form-text'>Tell us a little about yourself</small>
          </div>
          <div className='my-2'>
            <button type='button' className='btn btn-light'>
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          <div className='form-group social-input'>
            <i className='fab fa-twitter fa-2x'></i>
            <input
              type='text'
              placeholder='Twitter URL'
              name='twitter'
              value={this.state.twitter_url}
              onChange={e => {
                this.setState({ twitter_url: e.target.value });
              }}
            />
          </div>
          <div className='form-group social-input'>
            <i className='fab fa-facebook fa-2x'></i>
            <input
              type='text'
              placeholder='Facebook URL'
              name='facebook'
              value={this.state.facebook_url}
              onChange={e => {
                this.setState({ facebook_url: e.target.value });
              }}
            />
          </div>
          <div className='form-group social-input'>
            <i className='fab fa-youtube fa-2x'></i>
            <input
              type='text'
              placeholder='YouTube URL'
              name='youtube'
              value={this.state.youtube_url}
              onChange={e => {
                this.setState({ youtube_url: e.target.value });
              }}
            />
          </div>
          <div className='form-group social-input'>
            <i className='fab fa-linkedin fa-2x'></i>
            <input
              type='text'
              placeholder='Linkedin URL'
              name='linkedin'
              value={this.state.linkedin_url}
              onChange={e => {
                this.setState({ linkedin_url: e.target.value });
              }}
            />
          </div>
          <div className='form-group social-input'>
            <i className='fab fa-instagram fa-2x'></i>
            <input
              type='text'
              placeholder='Instagram URL'
              name='instagram'
              value={this.state.instagram_url}
              onChange={e => {
                this.setState({ instagram_url: e.target.value });
              }}
            />
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link to='/dashboard' className='btn btn-light my-1'>
            Go Back
          </Link>
        </form>
      </section>
    );
  }
}

export default EditProfile;
