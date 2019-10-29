import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CommentForm from './components/post/CommentForm';



const App = () => (
  // <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/posts' component={CommentForm} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  // </Provider>
);

export default App;