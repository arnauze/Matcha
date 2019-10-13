import React from 'react'
import Browsing from './Browsing'
import Profile from './Profile'
import Search from './Search'
import Chat from './Chat'
import EditProfile from '../Helpers/EditProfile'
import { connect } from 'react-redux'
import { startWebsocket } from '../../../Functions/Functions'
import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { API } from 'aws-amplify'

class MainPart extends React.Component {

    state = {
        notifications: []
    }

    updateUser = () => {

        let apiName = 'Matcha.users'
        let path = '/users/' + this.props.user.info.username
        let myInit = {}

        API.get(apiName, path, myInit)
        .then(data => {
            console.log("SUCCESS FETCHING THE USER")
            console.log(data)

            let action = {
                type: 'UPDATE_USER',
                value: {
                    user: data
                }
            }
            this.props.dispatch(action)

        })
        .catch(err => {
            console.log("ERROR FETCHING THE USER")
            console.log(err)
        })

    }

    reloadChat = () => {

        let action = {
            type: 'RELOAD_CHAT'
        }
        this.props.dispatch(action)

    }

    componentDidMount() {

        var user = this.props.user.info
        var updateState = state => this.setState(state)

        startWebsocket(user, updateState, this.state.notifications, this.updateUser, this.reloadChat)

    }

    dispatchPage = () => {

        switch(this.props.page.text) {

            case 'BROWSING':
                return (
                    <Browsing
                    changePage={this.props.changePage}
                    addNotification={this.addNotification}
                    />
                )

            case 'PROFILE':
                return (
                    <Profile
                    changePage={this.props.changePage}
                    isFriendProfile={false}
                    />
                )

            case 'FRIEND_PROFILE':
                return (
                    <Profile
                    changePage={this.props.changePage}
                    isFriendProfile={true}
                    username={this.props.page.var.username}
                    />
                )

            case 'SEARCH':
                return (
                    <Search
                    addNotification={this.addNotification}
                    changePage={this.props.changePage}
                    />
                )

            case 'EDIT_PROFILE':
                return (
                    <EditProfile />
                )
            
            case 'CHAT':
                return (
                    <Chat />
                )
            
            default:
                return null
        }

    }

    addNotification = (data) => {

        var notifications = [...this.state.notifications]
        notifications.push({data: data, timestamp: Date.now()})

        this.setState({
            ...this.state,
            notifications: notifications
        })

    }

    onClickNotification = (e) => {

        console.log(e)

        this.setState({
            notifications: this.state.notifications.filter(item => item !== e)
        })

    }

    dispatchNotification = () => {

        if (this.state.notifications.length > 0) {

            return (
                <div style={{position: 'absolute', top: 12, left: 7, display: 'flex', flexDirection: 'column'}}>
                    {
                        this.state.notifications.map((item, index) => {

                            return (
                                <div key={index} style={{width: '13vw', height: '6vh', backgroundColor: 'lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px black solid', borderRadius: 5, position: 'relative', margin: 5}}>
                                    <IconButton onClick={() => this.onClickNotification(item)} style={{position: 'absolute', top: 0, right: 0}}>
                                        <HighlightOffIcon style={{fontSize: 10}}/>
                                    </IconButton>
                                    {item.data}
                                </div>
                            )

                        })
                    }
                </div>
            )

        }

    }

    render() {

        console.log("STATE HERE:", this.state)

        return (

            <div style={{position: 'absolute', top: 60}}>
                { this.dispatchNotification() }
                { this.dispatchPage()}
            </div>

        )

    }

}

export default connect(state => { return { user: state.user } })(MainPart)