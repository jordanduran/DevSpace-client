import React from 'react'

const UsersContext = React.createContext({
    users: [],
    posts: [],
    loginMessage: '',
    loggedInUser: {},
    setPosts: () => {},
})

export default UsersContext