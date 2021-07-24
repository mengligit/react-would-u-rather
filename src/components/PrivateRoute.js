import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component:Component, authedUser, ...rest}) => {
    return (
      <Route {...rest} exact
            render={(props)=> (authedUser=== ''? 
            <Redirect to={{ 
              pathname: '/signin',
              state: { from: props.location }
            }} />: (<Component {...props}></Component>))}
           />
    )
  }

  function mapStateToProps({authedUser}) {
    return {authedUser}
}
export default (connect(mapStateToProps)(PrivateRoute));
