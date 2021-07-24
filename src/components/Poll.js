import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleSubmitAnswer} from '../actions/shared';
import {withRouter} from 'react-router-dom';
import InvalidURL from './InvalidURL';
import {Segment, Grid, Image, Button, Header, Form, Radio} from 'semantic-ui-react';

class Poll extends Component {
    state={answer: ''};

    handleChange = (e, { value }) => {
        this.setState({answer: value})
    };

    submitFunc = (e) => {
       e.preventDefault();
       let answer = '';
       if(e.target[0].checked === true) {
           answer = 'optionOne';
       } else {
         answer = 'optionTwo';
       }
      
       let answerObj = {
         answer,
         authedUser: this.props.authedUser,
         qid: this.props.id,
       }

       this.props.dispatch(
        handleSubmitAnswer(answerObj, this.props.authedUser)
        );

        this.props.history.push({
          pathname: `/questions/${this.props.id}/result`,
          state: {newPath: ''} 
        });

    }

    render() {
        if(!this.props.question) {
          return <InvalidURL/>
        }
        return (
          <Segment.Group>
            <Header as='h3' attached='top' textAlign="left" block>
              <Header.Content>{this.props.author.name} asks:</Header.Content>
            </Header>
            <Segment>
              <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column width={5} textAlign="center" verticalAlign='middle'>
                      <Image src={this.props.author.avatarURL}
                              size='medium' circular/>
                    </Grid.Column>
                  <Grid.Column  width={11}>
                    <Header as='h4'>Would You Rather...</Header>
                    <Form onSubmit={this.submitFunc}>
                      <Form.Field>
                        <Radio
                          label={this.props.question.optionOne.text}
                          name='radioGroup'
                          value='optionOne'
                          checked={this.state.answer === 'optionOne'}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Radio
                          label={this.props.question.optionTwo.text}
                          name='radioGroup'
                          value='optionTwo'
                          checked={this.state.answer === 'optionTwo'}
                          onChange={this.handleChange}
                        />
                      </Form.Field> 
                      <Form.Field>
                        <Button fluid color='green' disabled={this.state.answer===''}>Submit</Button>
                      </Form.Field> 
                   </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Segment.Group>

            
        );
    }
}

function mapStateToProps({authedUser, users, questions}, props) {
    const {id} = props.match.params;
    const question = questions[id];
    let author = null;
    if(question){
      author = users[question.author];
    }
   
    return {question, author, authedUser, id}
}
export default withRouter(connect(mapStateToProps)(Poll));
