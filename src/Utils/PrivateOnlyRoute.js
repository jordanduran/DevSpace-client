import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  const userId = parseInt(localStorage.getItem('userId'), 10);
  return (
    <Route
      {...props}
      render={componentProps =>
        userId ? (
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
