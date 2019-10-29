import React from 'react';
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

const CommentForm = () => {
  return (
    <div>
      <h1 className='large text-primary'>Welcome to the community</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Share what you know!{' '}
      </p>
      <form className='form my-1'>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default CommentForm;
