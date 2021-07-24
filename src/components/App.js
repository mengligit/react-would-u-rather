import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleGetInitialData} from '../actions/shared'
import QuestionBoard from './QuestionBoard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Poll from './Poll';
import Result from './Result';
import LeaderBoard from './LeaderBoard';
import CreateQuestion from './CreateQuestion';
import SignIn from './SignIn';
import Nav from './Nav';
import PrivateRoute from './PrivateRoute';
import InvalidURL from './InvalidURL';
import LoadingBar from 'react-redux-loading';
import { Grid } from 'semantic-ui-react';

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleGetInitialData());
  }
  
render() {
  return (
    <Router>
        <LoadingBar/>
        {this.props.loading && <Nav />}
        {this.props.loading ?
         <CustomGrid>
        <Switch>
        <PrivateRoute path='/' exact component={QuestionBoard} />
        <PrivateRoute path='/add' component={CreateQuestion} />
        <PrivateRoute path='/leaderboard' component={LeaderBoard} />
        <PrivateRoute path='/questions/:id' exact component={Poll} />         
        <PrivateRoute path='/questions/:id/result' exact component={Result}/>
        <Route path='/signin' component={SignIn} />
        <PrivateRoute path='*' component={InvalidURL}/>
        </Switch> 
        </CustomGrid>: null}
    </Router>
  );
}
}

const CustomGrid = ({children}) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
)

function mapStateToProps({authedUser}) {
    return {authedUser, loading: authedUser!==null}
}
export default (connect(mapStateToProps)(App));
