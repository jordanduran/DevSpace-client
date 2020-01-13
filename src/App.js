import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Developers from './components/layout/Developers';
import Posts from './components/post/Posts';
import UsersContext from './context/UsersContext';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/profiles/EditProfile';
import Profile from './components/profiles/Profile';
import PrivateOnlyRoute from './Utils/PrivateOnlyRoute';
import config from './config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loggedInUser: {},
      loginMessage: '',
      posts: []
    };
  }

  getPosts = () => {
    fetch(`${config.API_ENDPOINT}/api/post`)
      .then(res => res.json())
      .then(posts => {
        this.setState({
          posts
        });
        return posts;
      })
      .catch(err => console.log(err));
  };

  setPosts = posts => {
    this.setState({ posts });
  };

  getUsers = () => {
    fetch(`${config.API_ENDPOINT}/api/users`)
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
    this.getUsers();
    this.getPosts();
    if(localStorage.getItem('user')) {
      this.setState({ loggedInUser: localStorage.getItem('user'), loginMessage: 'Logged in!' });
    }
  }

  render() {
    const value = {
      posts: this.state.posts,
      users: this.state.users,
      loginMessage: this.state.loginMessage,
      loggedInUser: this.state.loggedInUser,
      setLoggedInUser: (user, message) => {
        localStorage.setItem('user', user);
        this.setState({ loggedInUser: user, loginMessage: message });
      },
      setPosts: this.setPosts,
      getUsersInState: () => {
        return this.state.users;
      }
    };

    return (
      <UsersContext.Provider value={value}>
        <Router>
          <Fragment>
            <Route path='/' component={Navbar} />
            <Route exact path='/' component={Landing} />
            <section className='container'>
              <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/developers' component={Developers} />
                <Route exact path='/profile/:id' component={Profile} />
                <Route
                  exact
                  path='/posts'
                  component={rprops => {
                    return (
                      <Posts
                        rprops={rprops}
                        users={this.state.users}
                        loggedInUser={this.state.loggedInUser}
                      />
                    );
                  }}
                />
                <Route exact path='/dashboard' component={Dashboard} />
                <PrivateOnlyRoute
                  exact
                  path='/edit-profile'
                  component={rprops => {
                    return (
                      <EditProfile
                        rprops={rprops}
                        loggedInUser={this.state.loggedInUser}
                      />
                    );
                  }}
                  loggedInUser={this.state.loggedInUser}
                />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </UsersContext.Provider>
    );
  }
}

export default App;
