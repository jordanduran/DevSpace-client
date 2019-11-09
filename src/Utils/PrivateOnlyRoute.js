import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps =>
        props.loggedInUser !== null ? (
          <Component {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: `/login`
            }}
          />
        )
      }
    />
  );
}

function objectIsEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}
