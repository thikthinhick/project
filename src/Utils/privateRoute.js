import React from 'react'
import { Redirect, Route } from 'react-router'
import { getToken } from './Common'
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      getToken() ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )