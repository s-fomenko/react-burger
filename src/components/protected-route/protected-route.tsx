import React from 'react';
import {Redirect, Route} from 'react-router-dom';

interface IProtectedRoute {
  isLoggedIn: boolean;
  path: string;
  redirect: string;
  children: React.ReactElement
}

function ProtectedRoute({ isLoggedIn, redirect, ...props }: IProtectedRoute) {
  console.log('isLoggedIn', isLoggedIn)
  return isLoggedIn ? <Route {...props} /> : <Redirect to={redirect} />;
}

export default ProtectedRoute;
