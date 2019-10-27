import React from 'react'
import Button from '@material-ui/core/Button'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
import Sound from 'react-sound'

export default class Connection extends React.Component {

    // This component is the navigation stack for the connection process

    state = {
        page: 'MAIN_PAGE'
    }

    onClick = (text) => {

        // Function called when a user clicks on the sign in or sign up button

        this.setState({
            ...this.state,
            page: text
        })

    }

    render() {

        // This component conditionnally renders the Main page, sign up page or sign in page

        if (this.state.page === 'MAIN_PAGE') {

            return (
                
                <div style={{width: '100%', height: '100vh', backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h4>Welcome to WeshBébé</h4>
                        <Sound
      url="http://streaming.tdiradio.com:8000/house.mp3"
      autoLoad={true}
      autoPlay={true}
      
      onLoading={this.handleSongLoading}
      onPlaying={this.handleSongPlaying}
      playStatus={Sound.status.PLAYING}
      onFinishedPlaying={this.handleSongFinishedPlaying}
    />
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

        } else if (this.state.page === 'FORGOT_PASSWORD') {
            
            return (

                <ForgotPassword
                changePage={this.onClick}
                />

            )

        }

    }

}