import React from 'react';
import UsersContext from '../../context/UsersContext';
import config from '../../config';

class Login extends React.Component {
  static contextType = UsersContext;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'post',
      body: JSON.stringify({
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
        if (data.message === 'Logged in!') {
          this.context.setLoggedInUser(data.user, data.message);
          localStorage.setItem('userId', data.userId);
        }
        if (!data.message) {
          this.setState({ message: 'Invalid login' });
        }
        this.setState({ message: data.message }, () => {
          if (this.state.message !== 'Invalid login') {
            this.props.history.push('/dashboard');
          }
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ message: 'Invalid login' });
      });
  }

  render() {
    return (
      <div>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign into Your Account
        </p>
        <form className='form' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              required
              onChange={event => this.setState({ email: event.target.value })}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              required
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
          </div>
          {this.state.message === 'Invalid login' && (
            <div className='error'>Invalid login</div>
          )}
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <a href='/register'>Sign Up</a>
        </p>
      </div>
    );
  }
}

export default Login;
