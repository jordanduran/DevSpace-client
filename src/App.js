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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loggedInUser: null,
      loginMessage: '',
      posts: []
    };
  }

  getPosts = () => {
    fetch('http://localhost:8000/api/post')
      .then(res => res.json())
      .then(posts => {
        console.log(posts);
        this.setState({
          posts
        });
        return posts;
      })
      .catch(err => console.log(err));
  };

  setPosts = (posts) => {
    this.setState({ posts });
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
    this.getUsers();
    this.getPosts();
  }

  render() {
    const value = {
      posts: this.state.posts,
      users: this.state.users,
      loginMessage: this.state.loginMessage,
      loggedInUser: this.state.loggedInUser,
      setLoggedInUser: (user, message) => {
        this.setState({ loggedInUser: user, loginMessage: message });
        console.log(this.state);
      },
      setPosts: this.setPosts
    };

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
                <Route exact path='/edit-profile' component={EditProfile} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </UsersContext.Provider>
    );
  }
}

export default App;
