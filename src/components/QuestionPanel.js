import React, {Component} from 'react';
import {connect} from 'react-redux';
import BriefQuestion from './BriefQuestion';

class QuestionPanel extends Component {

    render() {
        return (
          <div>
            {
                this.props.sortedQs.map((question) => (<BriefQuestion id={question.id} key={question.id}/>))
            }
          </div>
        );
      }
}

function mapStateToProps({questions},{ids}) {
    const selectedQ = ids.map((id)=> (questions[id]));
    const sortedQs = selectedQ.sort((a, b)=> (b.timestamp - a.timestamp));
    return {sortedQs}
}
export default connect(mapStateToProps)(QuestionPanel);
