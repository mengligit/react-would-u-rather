import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tab } from 'semantic-ui-react';
import QuestionPanel from './QuestionPanel';

class QuestionBoard extends Component {
     panes = [
        { menuItem: 'Unanswered Questions', render: () => 
          <Tab.Pane>
            <QuestionPanel ids={this.props.unansweredIds}/>
         </Tab.Pane> },
        { menuItem: 'Answered Questions', render: () => 
           <Tab.Pane>
            <QuestionPanel ids={this.props.answeredIds}/>
           </Tab.Pane> },
      ]

  render() {
    return (
        <Tab panes={this.panes} />
    );
  }
  
  }
  
  
  function mapStateToProps({authedUser, users, questions}) {
      console.log("Question Board - authedUser", authedUser);
      let userObj = users[authedUser];
      let answerObj = userObj.answers;
      let answeredIds = Object.keys(answerObj);
      let allQuesIds = Object.keys(questions);
      let unansweredIds = allQuesIds.filter((e) => !answeredIds.includes(e));

      return {
        authedUser,
        answeredIds,
        unansweredIds,
       };
  }
  


  export default connect(mapStateToProps)(QuestionBoard);
  