import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import Profile from './Profile';
import EditProfile from './EditProfile';

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  //render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<App />, div);

  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
