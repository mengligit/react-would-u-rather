import React, {Component} from 'react';
import {connect} from 'react-redux';
import LeaderElement from './LeaderElement';

class LeaderBoard extends Component {

    render() {
        return (
            <div>
                {this.props.users.map((user, index) => <LeaderElement userId={user.id} key={user.id} index={index}/>)}
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {users: Object.values(users).sort((a, b)=> {
        const createdQNum_a = a.questions.length;
        const answeredQNum_a = Object.keys(a.answers).length;
        const a_sum = createdQNum_a+answeredQNum_a;

        const createdQNum_b = b.questions.length;
        const answeredQNum_b = Object.keys(b.answers).length;
        const b_sum = createdQNum_b+answeredQNum_b;

        return b_sum - a_sum})}
}
export default connect(mapStateToProps)(LeaderBoard);
