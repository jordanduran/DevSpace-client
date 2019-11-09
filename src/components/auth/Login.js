import React from 'react';
import UsersContext from '../../context/UsersContext';

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
    fetch('http://localhost:8000/auth/login', {
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
        this.context.setLoggedInUser(data.user, data.message);
        this.setState({ message: data.message }, () => {
          if (this.state.message !== 'Invalid login') {
            this.props.history.push('/dashboard');
          }
        });
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
