import React from 'react'
import Amplify, { Auth } from 'aws-amplify'
import Connection from './Connection/Connection'
import Pages from './Application/Pages'
import { configs } from '../Constants/Constants'  // Importing the aws configs from my file
import { connect } from 'react-redux'

Amplify.configure(configs) // Updating the configs

class LandingPage extends React.Component {

    state = {
        loading: true
    }

    componentDidMount() {

        // Here I check to see if a user is connected
        // That function might create a problem when multiple user are logged in at the same time

        Auth.currentAuthenticatedUser()
        .then(data => {

            // If a user is already connected then I connect him in the frontend and I send him to the Browsing page

            console.log("Success calling the Auth API !")
            console.log(data)

            this.setState({
                ...this.state,
                loading: false
            })

            let action = {
                type: 'UPDATE_USER',
                value: {
                    user: {
                        username: 'arnauze'
                    }
                }
            }
            this.props.dispatch(action)

        })
        .catch(error => {

            // If there is an error trying to get the current authenticated user

            console.log("Error calling the Auth API !")
            console.log(error)

            this.setState({
                ...this.state,
                loading: false
            })

            if (error !== 'not authenticated') {

                // If there is an error and it is not because there is no user authenticated (connection problem, wrong parameters, etc)

                alert("Error trying to authenticate the user !")

            }

        })

    }

    render() {

        if (this.state.loading) {

            // If I am still waiting for my data I output the landing page

            return (

                <div style={{width: '100%', height: '100vh', backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <h1>WeshBébé</h1>
                </div>

            )

        } else {

            // If I have received the data

            if (this.props.user.isConnected) {

                // If the user is connected then I send him to the application stack

                return (
                
                    <Pages />
    
                )

            } else {

                // If the user is not connected then I output a menu allowing him to navigate to the Sign in or Sign up page

                return (
                
                    <Connection />
    
                )

            }

        }

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(LandingPage)