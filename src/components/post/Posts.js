import React from 'react';
import { Link } from 'react-router-dom';
import UsersContext from '../../context/UsersContext';
import config from '../../config';
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Posts extends React.Component {
  static contextType = UsersContext;

  static defaultProps = {
    rprops: {},
    users: {},
    loggedInUser: {}
  };

  renderPosts = () => {
    const { users } = this.props;
    const { posts } = this.context;

    return posts.map(post => {
      const user = users.filter(user => user.id === post.users)[0];

      return (
        <div className='post bg-white p-1 my-1' key={post.id}>
          <div>
            <Link to={`/profile/${user.id}`}>
              {!user.avatar ? (
                <img
                  className='round-img'
                  src='https://gravatar.com/avatar/8385556c89b788059f4edfc82735470a'
                  alt=''
                />
              ) : (
                <img className='round-img' src={user.avatar} alt='' />
              )}
              <h4>{user.name}</h4>
            </Link>
          </div>
          <div>
            <p className='my-1'>{post.post}</p>
            <p className='post-date'>Posted on {post.date_created}</p>
            {this.props.loggedInUser !== null ? (
              parseInt(localStorage.getItem('userId'), 10) === post.users && (
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => {
                    this.handleDeletePost(post.id);
                  }}
                >
                  <i className='fas fa-times'></i>
                </button>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      );
    });
  };

  handleCreatePost = async e => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem('userId'), 10);
    const post = e.target['post'].value;
    const avatar = this.props.loggedInUser.avatar;
    const newPost = await fetch(`${config.API_ENDPOINT}/api/post/`, {
      method: 'post',
      body: JSON.stringify({
        users: userId,
        post: post,
        avatar
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(newPost => {
        return newPost;
      })
      .catch(err => {
        console.log(err);
      });
    // e.target['post'].value='';
    this.context.setPosts([newPost, ...this.context.posts]);
  };

  handleDeletePost = postId => {
    fetch(`${config.API_ENDPOINT}/api/post/${postId}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(data => data)
      .catch(err => {
        console.log(err);
      });
    const newPosts = this.context.posts.filter(post => post.id !== postId);
    this.context.setPosts(newPosts);
  };

  render() {
    return (
      <section className='container'>
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome to the community!
        </p>
        {localStorage.getItem('user') && (
          <div className='post-form'>
            <div className='bg-primary p'>
              <h3>Say Something...</h3>
            </div>
            <form
              className='form my-1'
              onSubmit={e => {
                this.handleCreatePost(e);
              }}
            >
              <textarea
                name='post'
                cols='30'
                rows='5'
                placeholder='Create a post'
                required
              ></textarea>
              <input
                type='submit'
                className='btn btn-dark my-1'
                value='Submit'
              />
            </form>
          </div>
        )}
        <div className='posts'>{this.renderPosts()}</div>
      </section>
    );
  }
}

export default Posts;
