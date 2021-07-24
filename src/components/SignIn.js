import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Dropdown, Header, Segment, Grid, Image } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import {setAuthedUser} from '../actions/authedUser';
import { withRouter} from 'react-router-dom';


class SignIn extends Component {
    state = {selectedUserId: '',
             selectedUserName: '',
            };

    handleChange = (e, {value})=> {
        let selectedObjArr = this.props.usersArr.filter((item) => (item.text === value))
        this.setState({selectedUserId: selectedObjArr[0].key,
                       selectedUserName: value});
    }

    handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target);
      this.props.dispatch(setAuthedUser(this.state.selectedUserId));

      const {state} = this.props.location;
      if(state && state.from){
          this.props.history.replace(state.from);
      }
      else {
        this.props.history.push('/');
      }
    };

    render() {
        return (
       <Segment.Group>
        <Header as='h3' attached='top' textAlign="center" block>
            <Header.Content>Welcome to the Would You Rather App</Header.Content>
            <Header.Subheader>Please sign in to continue</Header.Subheader>
        </Header>
        <Segment attached>
          <Grid columns={1} textAlign="center" padded >
              <Grid.Row>
                  <Grid.Column>
                    <form onSubmit={this.handleSubmit}>
                        <Image src='/images/back5.png' size='medium' centered />
                        <Header as='h2' color='green'>Sign in</Header>
                        <Dropdown
                            onChange={this.handleChange}
                            value={this.state.selectedUserName}
                            placeholder='Select User'
                            fluid
                            selection
                            options={this.props.usersArr}
                        />
                        <div className='signInButton'>
                        <Button fluid color='green' disabled={!this.state.selectedUserName}>Sign in</Button>
                        </div>
                    </form>  
                  </Grid.Column>
              </Grid.Row>
            
          </Grid> 
        </Segment>
        </Segment.Group>)
    }
}


function mapStateToProps({users}) {
    const usersArr = Object.values(users).map((ele) => ({
        key: ele.id,
        text: ele.name,
        value: ele.name,
        image: { avatar: true, src: ele.avatarURL },
    }));
    console.log("usersArr",  usersArr);
    return {usersArr}
}
export default withRouter(connect(mapStateToProps)(SignIn));
