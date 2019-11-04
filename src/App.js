import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Developers from './components/layout/Developers';
import CommentForm from './components/post/CommentForm';
import UsersContext from './context/UsersContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  getUsers = () => {
    fetch('http://localhost:8000/api/users')
      .then(res => res.json())
      .then(users => {
        this.setState({
          users
        });
        return users;
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    Promise.resolve(this.getUsers())
  }

  render() {
    const value = {
      users: this.state.users
    }
    
    return (
      <UsersContext.Provider value={value}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/developers' component={Developers} />
              <Route exact path='/posts' component={CommentForm} />
            </Switch>
          </section>
        </Fragment>
      </Router>
      </UsersContext.Provider>
    );
  }
}

export default App;
