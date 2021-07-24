import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Segment, Grid, Image, Header, Progress, Label, Icon} from 'semantic-ui-react';
import InvalidURL from './InvalidURL';

const VoteLabel = () => {
  return (
    <Label color='orange' ribbon='right' size='big'>
         <Icon name='thumbs up outline' />
         Your Vote
    </Label>
  )
};

class Result extends Component {
    render() {
        let vote1Num = this.props.question.optionOne.votes.length;
        let vote2Num = this.props.question.optionTwo.votes.length;
        let perc = (vote1Num*1.0)/(vote2Num+vote1Num)*100;
        perc = perc.toFixed(2);
       
        if(!this.props.question){
          return <InvalidURL/>
        }
        return (
          <Segment.Group>
          <Header as='h3' attached='top' textAlign="left" block>
              <Header.Content>Asked by {this.props.author.name}</Header.Content>
          </Header>
          <Segment attached>
          <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column width={5} textAlign="center" verticalAlign='middle'>
                      <Image src={this.props.author.avatarURL}
                              size='medium' circular/>
                    </Grid.Column>
                  <Grid.Column  width={11}>
                    <Header as='h3'>Results:</Header>
                    <Segment color={this.props.answer === 'optionOne'? 'green': 'grey'}>
                       {
                         this.props.answer === 'optionOne' &&  <VoteLabel/>
                       }
                      
                      <p className='largeText'>
                      {this.props.question.optionOne.text}
                      </p>
                      <Progress percent={perc} color={this.props.answer === 'optionOne'? 'green': 'grey'} progress >
                         {vote1Num} out of {vote2Num + vote1Num} votes
                      </Progress>
                    </Segment>
                    <Segment color={this.props.answer === 'optionTwo'? 'green': 'grey'}>
                    {
                         this.props.answer === 'optionTwo' &&  <VoteLabel/>
                       }
                     <p className='largeText'>
                      {this.props.question.optionTwo.text}
                      </p>
                      <Progress percent={100-perc} color={this.props.answer === 'optionTwo'? 'green': 'grey'} progress >
                         {vote2Num} out of {vote2Num + vote1Num} votes
                      </Progress>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
           </Grid>
          </Segment>
          </Segment.Group>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props) {
    const {id} = props.match.params;
    const question = questions[id];
    let author = null;
    if(question){
      author = users[question.author];
    }
   
    const authedUserObj = users[authedUser];
    const answer = authedUserObj.answers[id];

    return {question, author, answer}
}
export default connect(mapStateToProps)(Result);