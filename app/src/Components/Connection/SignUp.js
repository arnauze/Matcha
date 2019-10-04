import React from 'react'
import { Button } from '@material-ui/core'
import { Auth, API } from 'aws-amplify'

export default class SignUp extends React.Component {

    // React component for the Sign up page

    state = {
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        waitingForConfirmation: false,
        confirmationCode: '',
        errors: {
            signUp: '',
            confirmationCode: ''
        }
    }

    //  ******************************************
    //  Functions handling the text fields variables
    //  ******************************************

    onUsernameChange = (text) => {

        this.setState({
            ...this.state,
            username: text
        })

    }

    onFirstNameChange = (text) => {

        this.setState({
            ...this.state,
            firstName: text
        })

    }

    onLastNameChange = (text) => {

        this.setState({
            ...this.state,
            lastName: text
        })

    }

    onEmailChange = (text) => {

        this.setState({
            ...this.state,
            email: text
        })

    }

    onPasswordChange = (text) => {

        this.setState({
            ...this.state,
            password: text
        })

    }

    onConfirmationCodeChange = text => {

        this.setState({
            ...this.state,
            confirmationCode: text
        })

    }

    //  ******************************************
    //  Functions called when the user submits a form
    //  ******************************************

    onSubmitSignUp = (e) => {

        // Function called when the user submits the sign up form

        e.preventDefault()

        this.setState({
            ...this.state,
            errors: {
                signUp: '',
                confirmationCode: ''
            }
        })

        Auth.signUp({
            username: this.state.username,
            password: this.state.password,
            attributes: {
                email: this.state.email
            }
        })
        .then(data => {

            // If the user signed up I output the message and form to confirm his email address

            console.log("Successfully created a new user:", data)

            this.setState({
                ...this.state,
                waitingForConfirmation: true
            })

        })
        .catch(err => {
            
            // If the user couldn't sign up I output an error message explaining why it didn't work

            console.log(err)

            this.setState({
                ...this.state,
                errors: {
                    signUp: err.message,
                    confirmationCode: ''
                }
            })

        })

    }

    onSubmitConfirmationCode = (e) => {

        // Function called when the user submits the confirmation form

        e.preventDefault()

        Auth.confirmSignUp(this.state.username, this.state.confirmationCode)
        .then(data => {

            // If the confirmation worked succesfully

            console.log("Success confirmating the user")
            console.log(data)

            let apiName = 'Matcha'
            let path = '/users'
            let myInit = {
                body: {
                    user: {
                        username: this.state.username,
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        email: this.state.email
                    }
                }
            }
            
            API.post(apiName, path, myInit)
            .then(data => {
                
                console.log("Successfully added the new user in the database")
                console.log(data)

                this.props.changePage('SIGN_IN')

            })
            .catch(error => {

                console.log("Error adding the user in the database")
                console.log(error)

                this.setState({
                    ...this.state,
                    errors: {
                        confirmationCode: "Error adding the user in the database",
                        signUp: ''
                    }
                })

            })

        })
        .catch(error => {
            
            // If there was an error with the confirmation

            console.log("Error confirmating the user:")
            console.log(error)

            this.setState({
                ...this.state,
                errors: {
                    confirmationCode: error.message,
                    signUp: ''
                }
            })

        })

    }

    //  ******************************************
    //  Functions that conditionnaly render the frontend
    //  ******************************************

    renderUnderForm = () => {

        // Function that renders informations under the sign up form
        // If the user just signed up and needs to add the confirmation code I output fields for it
        // If the user hasn't signed up yet I output a message allowing him to navigate to the sign in page

        if (this.state.waitingForConfirmation) {

            return (

                <div style={{marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <form
                    onSubmit={e => this.onSubmitConfirmationCode(e)}
                    style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                    >
                        We've sent a confirmation code to your email!
                        <br />
                        <input type="text" value={this.state.confirmationCode} onChange={e => this.onConfirmationCodeChange(e.target.value)} style={{marginTop: 10}}/>
                        <br />
                        <input type="submit" value="Confirm"/>
                        <b style={{color: 'red', marginTop: 7}}>{ this.renderErrorConfirmationCode() }</b>
                    </form>
                </div>

            )

        } else {

            return (

                <Button
                style={{color: 'blue', marginTop: 5}}
                size="small"
                onClick={() => this.props.changePage('SIGN_IN')}
                >
                    Already have an account ? Sign in here
                </Button>

            )

        }

    }

    renderErrorSignUp = () => {

        // If there has been an error signing up, then I output an error message

        if (this.state.errors.signUp.length > 0) {
            return this.state.errors.signUp
        } else {
            return null
        }

    }

    renderErrorConfirmationCode = () => {

        // If there is an error with the confirmation code, then I output an error message

        if (this.state.errors.confirmationCode.length > 0) {
            return this.state.errors.confirmationCode
        } else {
            return null
        }

    }

    render() {

        return (
            <div style={{width: '100%', height: '100vh', backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{backgroundColor: 'white', border: '0.5px black solid', borderRadius: 5}}>
                    <div style={{margin: 20}}>
                        <form
                        onSubmit={e => this.onSubmitSignUp(e)}
                        style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}
                        >
                            <label>
                                Username:
                                <input type='text' value={this.state.username} onChange={e => this.onUsernameChange(e.target.value)} style={{marginLeft: 5}}/>
                            </label>
                            <br />
                            <label>
                                First name:
                                <input type='text' value={this.state.firstName} onChange={e => this.onFirstNameChange(e.target.value)} style={{marginLeft: 5}}/>
                            </label>
                            <br />
                            <label>
                                Last name:
                                <input type='text' value={this.state.lastName} onChange={e => this.onLastNameChange(e.target.value)} style={{marginLeft: 5}}/>
                            </label>
                            <br />
                            <label>
                                Email:
                                <input type='text' value={this.state.email} onChange={e => this.onEmailChange(e.target.value)} style={{marginLeft: 5}}/>
                            </label>
                            <br />
                            <label>
                                Password:
                                <input type='password' value={this.state.password} onChange={e => this.onPasswordChange(e.target.value)} style={{marginLeft: 5}}/>
                            </label>
                            <br />
                            <input type="submit" value="Sign up"/>
                        </form>
                        <b style={{color: 'red', marginTop: 10, alignSelf: 'center'}}>{ this.renderErrorSignUp() }</b>
                        <br />
                        {
                            this.renderUnderForm()
                        }
                    </div>
                </div>
            </div>
        )

    }

}