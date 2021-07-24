import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Label, Segment, Header, Divider, Grid, Image} from 'semantic-ui-react';

class LeaderElement extends Component {

    trophyColors = ['yellow', 'red', 'orange'];

    render() {
        return (
            <Segment.Group>
                <Label corner= 'left' icon= 'trophy' color={this.props.index <=2 ? this.trophyColors[this.props.index] : 'grey'} />
                <Grid padded columns={3} divided>
                    <Grid.Row>
                        <Grid.Column  width={4} verticalAlign="middle">
                            <Image src={this.props.author.avatarURL }
                            size='small' circular
                            />            
                        </Grid.Column>
                        <Grid.Column width={8}>
                           <Header as='h3'>
                            {this.props.author.name}
                           </Header>
                           <Grid columns={2}>
                               <Grid.Column width={13}>
                                  <p>Answered Questions</p>
                               </Grid.Column>
                               <Grid.Column width={3}>
                                  <p>{this.props.answeredQNum}</p>
                               </Grid.Column>
                           </Grid>
                           <Divider />
                           <Grid columns={2}>
                               <Grid.Column width={13}>
                                  <p>Created Questions</p>
                               </Grid.Column>
                               <Grid.Column width={3}>
                                  <p>{this.props.createdQNum}</p>
                               </Grid.Column>
                           </Grid>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        <Header as='h4' attached='top' textAlign="center" block>
                            <Header.Content>Score</Header.Content>
                        </Header>
                        <Segment attached textAlign="center">
                           <Label circular color='green' size='huge'>{this.props.answeredQNum + this.props.createdQNum }</Label>
                        </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment.Group>
         
        );
      }
}

function mapStateToProps({users}, {userId}) {
    const author = users[userId];
    const createdQNum = author.questions.length;
    const answeredQNum = Object.keys(author.answers).length;
    return {author, answeredQNum, createdQNum}
}
export default connect(mapStateToProps)(LeaderElement);
