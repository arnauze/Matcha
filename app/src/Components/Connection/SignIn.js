import React from 'react'
import { Button } from '@material-ui/core'
import { Auth, API } from 'aws-amplify'
import { connect } from 'react-redux'

class SignIn extends React.Component {

    state = {
        username: '',
        password: '',
        errors: {
            signIn: ''
        }
    }

    //	****************************************
    //	Functions handling the fields variables
    //	****************************************

    onUsernameChange = (text) => {

        // Function called when the username input changes

        this.setState({
            ...this.state,
            username: text
        })

    }

    onPasswordChange = (text) => {

        // Function called when the password input changes

        this.setState({
            ...this.state,
            password: text
        })

    }

    //	****************************************
    //	Function called when the user submits the sign in form
    //	****************************************

    onSubmitSignIn = (e) => {

        // Function called when the user submits the sign in form

        e.preventDefault()

        Auth.signIn(this.state.username, this.state.password)
        .then(data => {

            console.log("Success signing in!")
            console.log(data)

            // After signing in with AWS Cognito, I call my API to get the connected user informations

            let apiName = 'Matcha'
            let path = '/users/' + data.username
            let myInit = {}
            
            API.get(apiName, path, myInit)
            .then(data => {
                
                console.log("Successfully called ", path)
                console.log("Response: ", data)

                // If the API Call worked, then I update the global state to connect the user and save its informations

                let action = {
                    type: 'UPDATE_USER',
                    value: {
                        user: data
                    }
                }
    
                this.props.dispatch(action)

            })
            .catch(error => {
                
                // If there was an error calling the API then I log an error message

                console.log("Error calling ", path)
                console.log("Error: ", error)

            })

        })
        .catch(error => {

            console.log("Error signing in ..")
            console.log(error)

            this.setState({
                ...this.state,
                errors: {
                    signIn: error.message
                }
            })

        })

    }

    //	****************************************
    //	Functions conditionnaly rendering the frontend
    //	****************************************

    renderErrorSignIn = () => {

        if (this.state.errors.signIn.length > 0) {
            return this.state.errors.signIn
        } else {
            return null
        }

    }

    render() {

        return (

            <div style={{width: '100%', height: '100vh', backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{backgroundColor: 'white', border: '0.5px black solid', borderRadius: 5}}>
                    <div style={{margin: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <form
                        onSubmit={e => this.onSubmitSignIn(e)}
                        style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}
                        >
                            <label>
                                Username:
                                <input type='text' value={this.state.username} onChange={e => this.onUsernameChange(e.target.value)} style={{marginLeft: 5}}/>
                            </label>
                            <br />
                            <label>
                                Password:
                                <input type='password' value={this.state.password} onChange={e => this.onPasswordChange(e.target.value)} style={{marginLeft: 5}}/>
                            </label>
                            <br />
                            <input type="submit" value="Sign in"/>
                        </form>
                        <Button
                        style={{color: 'blue', marginTop: 5}}
                        size="small"
                        onClick={() => this.props.changePage('SIGN_UP')}
                        >
                            Don't have an account yet ? Sign up here
                        </Button>
                        <b style={{color: 'red', marginTop: 7}}>{ this.renderErrorSignIn() }</b>
                    </div>
                </div>
            </div>

        )

    }

}

export default connect()(SignIn)