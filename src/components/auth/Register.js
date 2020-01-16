import React from 'react';
import UsersContext from '../../context/UsersContext';

class Register extends React.Component {
  static contextType = UsersContext;
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      user: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('https://stormy-crag-28024.herokuapp.com/auth/signup', {
      method: 'post',
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.context.setLoggedInUser(data.id.id, 'Logged in!');
        localStorage.setItem('userId', data.id.id);
        this.props.history.push('/dashboard');
      });
  }

  render() {
    return (
      <div>
        {' '}
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form
          className='form'
          onSubmit={this.handleSubmit}
          action='create-profile.html'
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              required
              onChange={event => this.setState({ name: event.target.value })}
              value={this.state.value}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              onChange={event => this.setState({ email: event.target.value })}
              value={this.state.value}
            />
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              required
              onChange={event =>
                this.setState({ password: event.target.value })
              }
              value={this.state.value}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              minLength='6'
              onChange={event =>
                this.setState({ password2: event.target.value })
              }
              value={this.state.value}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Submit' />
        </form>
        <p className='my-1'>
          Already have an account? <a href='/login'>Sign In</a>
        </p>
      </div>
    );
  }
}

export default Register;
