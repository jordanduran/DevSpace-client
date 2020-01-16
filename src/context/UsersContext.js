import React from 'react';

const UsersContext = React.createContext({
  users: [],
  posts: [],
  loginMessage: '',
  loggedInUser: {},
  setPosts: () => {},
  setUsers: () => {}
});

export default UsersContext;
