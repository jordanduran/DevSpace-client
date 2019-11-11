import React from 'react';
import UsersContext from '../../context/UsersContext';
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Posts extends React.Component {
  static contextType = UsersContext;
  renderPosts = () => {
    const { posts } = this.context;
    const { users } = this.props;
    return posts.map(post => {
      const user = users.filter(user => user.id === post.users)[0];
      return (
        <div className='post bg-white p-1 my-1' key={post.id}>
          <div>
            <a href='profile.html'>
              <img className='round-img' src={post.avatar} alt='' />
              <h4>{user.name}</h4>
            </a>
          </div>
          <div>
            <p className='my-1'>{post.post}</p>
            <p className='post-date'>Posted on {post.date_created}</p>
            {(this.props.loggedInUser.id === post.users && this.props.loggedInUser !== null) && (
              <button type='button' className='btn btn-danger' onClick={() => {this.handleDeletePost(post.id)}}>
                <i className='fas fa-times'></i>
              </button>
            )}
          </div>
        </div>
      );
    });
  };

  handleCreatePost = async e => {
    e.preventDefault();
    const userId = this.props.loggedInUser.id;
    const post = e.target['post'].value;
    const avatar = this.props.loggedInUser.avatar;
    const newPost = await fetch(`https://stormy-crag-28024.herokuapp.com/api/post/`, {
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
        console.log(newPost);
        return newPost;
      })
      .catch(err => {
        console.log(err);
      });
    // e.target['post'].value='';
    this.context.setPosts([newPost, ...this.context.posts]);
  };

handleDeletePost = (postId) => {
  fetch(`https://stormy-crag-28024.herokuapp.com/api/post/${postId}`, {
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
}

  render() {
    return (
      <section className='container'>
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome to the community!
        </p>
        {this.props.loggedInUser !== null && (
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
