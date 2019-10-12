import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import NotificationItem from './NotificationItem'
import { sendNotification } from '../../../Functions/Functions'

const connections = [
    'arnauze',
    'arnauze',
    'arnauze',
    'arnauze',
    'arnauze',
    'arnauze',
    'arnauze'
]

export default class BottomBar extends React.Component {

    state = {
        open: false
    }

    onClick = (e) => {
       
        this.anchorEl = e.currentTarget
        
        this.setState({
            ...this.state,
            open: true
        })

        let path = "sendMessage"
        let data = {
            "to": "maxence",
            "message": "YO COMMENT TU VAS"
        }

        sendNotification(path, data)

    }

    onClose = () => {

        this.anchorEl = null

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
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {
                            connections.map((item, index) => (
                                <NotificationItem
                                key={index}
                                notification={item}
                                />

                            ))
                        }
                    </div>
                </Menu>
            </div>

        )

    }

}