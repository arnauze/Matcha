import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import NotificationItem from './NotificationItem'
import { API } from 'aws-amplify'
import { connect } from 'react-redux'

class BottomBar extends React.Component {

    state = {
        open: false
    }

    getUnreadNotifications = () => {

        var i = 0
        var index = 0
        while (index < this.props.user.info.notifications.length) {
            if (!this.props.user.info.notifications[index].seen) {
                i++;
            }
            index++
        }

        return i

    }

    onClick = (e) => {
        
        this.setState({
            ...this.state,
            open: true
        })

    }

    onClose = () => {

        let apiName = 'Matcha'
        let path = '/users/' + this.props.user.info.username + '/notifications/see'
        let myInit = {}

        API.post(apiName, path, myInit)
        .then(data => {
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
            console.log(err)
        })

        this.setState({
            ...this.state,
            open: false
        })

    }

    render() {

        console.log(this.state)

        return (
            <div>
                <AppBar position="fixed" color="primary" style={{bottom: 0, top: 'auto'}}>
                    <Toolbar
                    style={{display: 'flex', justifyContent: 'center'}}
                    >
                        <IconButton
                        id="b"
                        onClick={(e) => this.onClick(e)}
                        >
                            <NotificationsIcon />
                            <b style={{fontWeight: 'normal', fontSize: 12, top: 10}}>{this.getUnreadNotifications()}</b>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Menu
                id="long-menu"
                anchorEl={document.getElementById("b")}
                open={this.state.open}
                onClose={() => this.onClose()}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                PaperProps={{
                    style: {
                        width: '40vw'
                    },
                }}
                >
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {
                            this.props.user.info.notifications.length > 0
                            ?
                                this.props.user.info.notifications.sort((a, b) => {return b.timestamp - a.timestamp}).map((item, index) => (
                                    
                                    <NotificationItem
                                    key={index}
                                    notification={item}
                                    />

                                ))
                            :
                                "You don't have any notifications"
                        }
                    </div>
                </Menu>
            </div>

        )

    }

}

export default connect(state => { return { user: state.user } } )(BottomBar)