import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Divider, Input, Segment, Header, Grid} from 'semantic-ui-react';
import {handleAddQuestion} from '../actions/shared';
import {withRouter} from 'react-router-dom';

class CreateQuestion extends Component {
    state= {
        option1Text: '',
        option2Text: '',
    }
 
    textChange1 = (event) => {
        this.setState((prev) => ({
            option1Text: event.target.value
        }))
    }
    textChange2 = (event) => {
        this.setState((prev) => ({
            option2Text: event.target.value
        }))
    }
    submit = (e) => {
        e.preventDefault();
        const {authedUser} = this.props;
        
        //`author`, `optionOneText`, and `optionTwoText`
        const question = {
            author: authedUser,
            optionOneText: this.state.option1Text,
            optionTwoText: this.state.option2Text,
        }
        this.props.dispatch(
            handleAddQuestion(question, authedUser)
        );

        this.setState((prev) => ({
            option1Text: "",
            option2Text: "",

        }));

        this.props.history.push({
            pathname: '/',
            state: {newPath: 'home'} 
        });
    }

    render() {
        const {option1Text, option2Text} = this.state;
        return (
            <Segment.Group>
                 <Header as='h3' attached='top' textAlign="center" >
                    <Header.Content>Create New Question</Header.Content>
                 </Header>
                 <Grid padded>
                       <Grid.Row>
                           <Grid.Column>
                             <form  onSubmit={this.submit}>
                                <p className='largeText'>Complete the question:</p>
                                <p><strong>Would you rather ...</strong> </p>    
                                <Input size='big' value={option1Text} onChange={this.textChange1} fluid></Input>
                                <Divider horizontal>OR</Divider>
                                <Input size='big' value={option2Text} onChange={this.textChange2} fluid></Input>
                                <br />
                                <Button color='green' fluid disabled={option1Text==='' || option2Text===''}>Submit</Button>                
                            </form>
                           </Grid.Column>
                       </Grid.Row>
                </Grid>
            </Segment.Group>
           
           
        )
    }
}

function mapStateToProps({users, authedUser}) {
   
    return {users, authedUser}
}
export default withRouter(connect(mapStateToProps)(CreateQuestion));
