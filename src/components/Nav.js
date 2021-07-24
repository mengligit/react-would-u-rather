import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { Menu, Grid, Image } from 'semantic-ui-react';
import {setAuthedUser} from '../actions/authedUser';
import {NavLink, withRouter} from 'react-router-dom';


class Nav extends Component {
    state = { activeItem: '' };
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        if(name === 'logout'){
           this.props.dispatch(setAuthedUser(""));
           this.setState({ activeItem: '' });
           this.props.history.push('/signin');
           
        }
    }

    checkActive(curItem){
       const { activeItem } = this.state;
       const {newPath} = this.props;
       if(newPath!==null && newPath!='null' && this.state.activeItem!== newPath) {
         return newPath === curItem;
       }

       return (activeItem === curItem);
    }
   
    render() {
        const {authedUserObj} = this.props;

        return (
        <Grid textAlign="center">
            <Grid.Row>
                <Grid.Column width={12}>
                  <Menu pointing secondary color='green' stackable>
                    <Menu.Item
                        name='home'
                        as={NavLink}
                        exact
                        to='/'
                        active={this.checkActive('home')}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='New Question'
                        as={NavLink}
                        to='/add'
                        active={this.checkActive('New Question')}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Leader Board'
                        as={NavLink}
                        to='/leaderboard'
                        active={this.checkActive('Leader Board')}
                        onClick={this.handleItemClick}
                    />
                    {authedUserObj && 
                        <Fragment >
                            <Menu.Item>
                            <span>Hello, {authedUserObj.name}</span>
                            </Menu.Item>
                            <Menu.Item>
                                <Image src={authedUserObj.avatarURL} size='mini' circular />
                            </Menu.Item>
                            <Menu.Menu position='right'>
                                <Menu.Item
                                name='logout'
                                as={NavLink}
                                exact
                                to='/signin'
                                active={this.checkActive('logout')}
                                onClick={this.handleItemClick}
                                />
                            </Menu.Menu>
                        </Fragment>}
                    </Menu>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
        )
    }
}

function mapStateToProps({authedUser, users}, props) {
    const authedUserObj = users[authedUser];
    let newPath = 'null';
    if(props.location.state){
         newPath = props.location.state.newPath;
    }
   
    return {authedUserObj, newPath}
}
export default withRouter(connect(mapStateToProps)(Nav));