import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Segment, Grid, Image, Button, Header} from 'semantic-ui-react';

class BriefQuestion extends Component {
    handleSubmit = (e)=> {
      e.preventDefault();
      if(this.props.answered) {
        //show result
        this.props.history.push({
          pathname: `/questions/${this.props.id}/result`,
          state: {newPath: ''} 
        })
      }
      else {
        //show question
        this.props.history.push({
          pathname: `/questions/${this.props.id}`,
          state: {newPath: ''} 
        })
      }
      
    } 

    render() {
        return (
          <Segment.Group>
              <Header as='h4' attached='top' textAlign="left" block>
                <Header.Content>{this.props.author.name} asks:</Header.Content>
              </Header>
                <Grid padded divided>
                  <Grid.Row>
                    <Grid.Column width={5} textAlign="center"  verticalAlign='middle'>
                      <Image src={this.props.author.avatarURL}
                              size='medium' circular/>
                    </Grid.Column>
                    <Grid.Column width={11} textAlign='center'>
                      <Header as='h4' textAlign="left" >
                      <Header.Content>Would you rather</Header.Content>
                      </Header>
                      <p className='largeText'>
                        {this.props.question.optionOne.text}
                        <br/>
                        or ...
                      </p>
                      <Button onClick={this.handleSubmit} fluid color={this.props.answered? 'teal': 'green'}>
                          {this.props.answered? 'View Results': 'View Poll'}
                      </Button>
                     </Grid.Column>
                    </Grid.Row>
                  </Grid>
          </Segment.Group>
          
        );
      }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
    const question = questions[id];
    const author = users[question.author];
    const answeredQIdArr = Object.keys(users[authedUser].answers);
    const answered = answeredQIdArr.includes(id);
    return {question, author, answered }
}
export default withRouter(connect(mapStateToProps)(BriefQuestion));
