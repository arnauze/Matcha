import React from 'react'
import Button from '@material-ui/core/Button'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default class Connection extends React.Component {

    // This component is the navigation stack for the connection process

    state = {
        page: 'MAIN_PAGE'
    }

    onClick = (text) => {

        this.setState({
            ...this.state,
            page: text
        })

    }

    render() {

        if (this.state.page === 'MAIN_PAGE') {

            return (

                <div style={{width: '100%', height: '100vh', backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h4>Welcome to WeshBébé</h4>
                        <Button
                        variant="contained"
                        style={{width: 125, height: 50, margin: 5}}
                        onClick={() => this.onClick('SIGN_IN')}
                        >
                            Sign in
                        </Button>
                        <Button
                        variant="contained"
                        style={{width: 125, height: 50, margin: 5}}
                        onClick={() => this.onClick('SIGN_UP')}
                        >
                            Sign up
                        </Button>
                    </div>
                </div>

            )

        } else if (this.state.page === 'SIGN_IN') {

            return (
                
                <SignIn
                changePage={this.onClick}
                />

            )

        } else if (this.state.page === "SIGN_UP") {

            return (

                <SignUp
                changePage={this.onClick}
                />

            )

        }

    }

}