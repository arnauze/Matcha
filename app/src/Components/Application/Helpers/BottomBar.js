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
        open: false,
        notifications: []
    }

    onClick = (e) => {

        this.anchorEl = e.currentTarget
        
        let apiName = 'Matcha'
        let path = '/users/' + this.props.user.info.username
        let myInit = {}

        API.get(apiName, path, myInit)
        .then(data => {

            this.setState({
                ...this.state,
                notifications: data.notifications.sort((a, b) => { return b.timestamp - a.timestamp }),
                open: true
            })

        })
        .catch(err => {
            console.log(err)
        })

    }

    onClose = () => {

        this.anchorEl = null

        let apiName = 'Matcha'
        let path = '/users/' + this.props.user.info.username + '/notifications/see'
        let myInit = {}

        API.post(apiName, path, myInit)
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })

        this.setState({
            ...this.state,
            open: false
        })

    }

    onClickItem = (item) => {

        console.log(item)

    }

    render() {

        return (
            <div>
                <AppBar position="fixed" color="primary" style={{bottom: 0, top: 'auto'}}>
                    <Toolbar
                    style={{display: 'flex', justifyContent: 'center'}}
                    >
                        <IconButton
                        onClick={(e) => this.onClick(e)}
                        >
                            <NotificationsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Menu
                id="long-menu"
                anchorEl={this.anchorEl}
                open={this.state.open}
                onClose={() => this.onClose()}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                PaperProps={{
                    style: {
                        maxHeight: '30vh',
                        width: '20vw'
                    },
                }}
                >
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {
                            this.state.notifications.length > 0
                            ?
                                this.state.notifications.map((item, index) => (
                                    
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