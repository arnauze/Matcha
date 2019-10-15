import React from 'react'
import { Auth } from 'aws-amplify'
import { Button } from '@material-ui/core'

export default class ForgotPassword extends React.Component {

    state = {
        emailSent: false,
        username: '',
        newPassword: '',
        confirmationCode: '',
        errorMessage: '',
        secondErrorMessage: ''
    }

    onUsernameChange = (text) => {

        this.setState({
            ...this.state,
            username: text
        })

    }

    onConfirmationCodeChange = (text) => {

        this.setState({
            ...this.state,
            confirmationCode: text
        })

    }

    onPasswordChange = (text) => {

        this.setState({
            ...this.state,
            newPassword: text
        })

    }

    onSendEmail = (e) => {

        e.preventDefault()

        this.setState({
            ...this.state,
            errorMessage: ''
        })

        Auth.forgotPassword(this.state.username)
        .then(data => {
            this.setState({
                ...this.state,
                emailSent: true
            })
        })
        .catch(err => {
            this.setState({
                ...this.state,
                errorMessage: err.message
            })
        })

    }

    onSubmitNewPassword = (e) => {

        e.preventDefault()

        this.setState({
            ...this.state,
            secondErrorMessage: ''
        })

        Auth.forgotPasswordSubmit(this.state.username, this.state.confirmationCode, this.state.newPassword)
        .then(data => {
            alert("Successfully updated the password")
            this.props.changePage('SIGN_IN')
        })
        .catch(err => {
            this.setState({
                ...this.state,
                secondErrorMessage: err.message
            })
        })

    }

    renderErrorSendEmail = () => {

        if (this.state.errorMessage.length > 0) {

            return this.state.errorMessage

        }

    }

    renderSecondErrorMessage = () => {

        if (this.state.secondErrorMessage.length > 0) {

            return this.state.secondErrorMessage.length

        }

    }

    renderBottom = () => {

        if (this.state.emailSent) {

            return (
                <React.Fragment>
                    <form
                    onSubmit={(e) => this.onSubmitNewPassword(e)}
                    style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}
                    >
                        <label>
                            Confirmation code:
                            <input type='text' value={this.state.confirmationCode} onChange={e => this.onConfirmationCodeChange(e.target.value)} style={{marginLeft: 5}}/>
                        </label>
                        <br />
                        <label>
                            New password:
                            <input type='password' value={this.state.newPassword} onChange={e => this.onPasswordChange(e.target.value)} style={{marginLeft: 5}}/>
                        </label>
                        <br />
                        <input type="submit" value="Confirm new password"/>
                    </form>
                    <b style={{color: 'red', marginTop: 7}}>{ this.renderSecondErrorMessage() }</b>
                </React.Fragment>
            )

        }

    }

    render() {

        return (

            <div style={{width: '98vw', height: '98vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{backgroundColor: 'white', border: '0.5px black solid', borderRadius: 5}}>
                    <div style={{margin: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <form
                        onSubmit={(e) => this.onSendEmail(e)}
                        style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}
                        >
                            <label>
                                Username:
                                <input type='text' value={this.state.username} onChange={e => this.onUsernameChange(e.target.value)} style={{marginLeft: 5}}/>
                            </label>
                            <br />
                            <input type="submit" value="Send email"/>
                        </form>
                        <b style={{color: 'red', marginTop: 7}}>{ this.renderErrorSendEmail() }</b>
                        {
                            this.renderBottom()
                        }
                    </div>
                </div>
                <Button
                style={{position: 'absolute', top: 10, left: 10}}
                variant="contained"
                color="primary"
                onClick={() => this.props.changePage('SIGN_IN')}
                >
                    BACK
                </Button>
            </div>

        )

    }

}