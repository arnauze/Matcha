import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import { Auth, API } from 'aws-amplify'
import { connect } from 'react-redux'

class TopBar extends React.Component {

    onSignOut = () => {

        // Function called when the user tries to log out

        Auth.signOut({global: true})
        .then(data => {

            // If it worked, then I call my API to update the last connection time

            console.log("Successfully logged out")
            console.log(data)

            let apiName = 'Matcha'
            let path = '/users/' + this.props.user.info.username + '/disconnect'
            let myInit = {}
            
            API.post(apiName, path, myInit)
            .then(data => {

                console.log("Successfully changed last connection time in the database")
                console.log(data)

                // If the API Call worked, then I disconnect the user from the frontend

                let action = {
                    type: 'DISCONNECT_USER'
                }
    
                this.props.dispatch(action)

            })
            .catch(error => {

                // If there was an error calling the API then I log the error

                console.log("Error changing the last connection time in the database")
                console.log(error)

            })

        })
        .catch(error => {

            // If there was an error signing out of Cognito

            console.log("Error logging out")
            console.log(error)

        })

    }

    render() {

        return (

            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <IconButton onClick={() => this.onSignOut()}>
                        <AddIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>

        )

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(TopBar)