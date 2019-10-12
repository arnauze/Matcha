import React from 'react'
import Browsing from './Browsing'
import Profile from './Profile'
import Search from './Search'
import EditProfile from '../Helpers/EditProfile'
import { connect } from 'react-redux'
import { startWebsocket } from '../../../Functions/Functions'
import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class MainPart extends React.Component {

    state = {
        notifications: []
    }

    componentDidMount() {

        var user = this.props.user.info
        var updateState = state => this.setState(state)

        startWebsocket(user, updateState, this.state.notifications)

    }

    dispatchPage = () => {

        switch(this.props.page) {

            case 'BROWSING':
                return (
                    <Browsing
                    changePage={this.props.changePage}
                    />
                )

            case 'PROFILE':
                return (
                    <Profile
                    changePage={this.props.changePage}
                    />
                )

            case 'SEARCH':
                return (
                    <Search />
                )

            case 'EDIT_PROFILE':
                return (
                    <EditProfile />
                )
            
            default:
                return null
        }

    }

    onClickNotification = (e) => {

        this.setState({
            notifications: this.state.notifications.filter(item => item.timestamp !== e.timestamp)
        })

    }

    dispatchNotification = () => {

        if (this.state.notifications.length > 0) {

            return (
                <div style={{position: 'absolute', top: 12, left: 7, display: 'flex', flexDirection: 'column'}}>
                    {
                        this.state.notifications.map((item, index) => {

                            return (
                                <div style={{width: '13vw', height: '6vh', backgroundColor: 'lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px black solid', borderRadius: 5, position: 'relative', margin: 5}}>
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