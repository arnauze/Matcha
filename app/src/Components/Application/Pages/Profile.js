import React from 'react'
import { connect } from 'react-redux'
import FirstConnection from '../Helpers/FirstConnection'
import { Button } from '@material-ui/core'
import { API } from 'aws-amplify'

class Profile extends React.Component {

    state = {
        loading: true,
        user: {}
    }

    componentDidMount() {

        if (this.props.isFriendProfile) {

            let apiName = 'Matcha'
            let path = '/users/' + this.props.username
            let myInit = {}

            API.get(apiName, path, myInit)
            .then(data => {

                this.setState({
                    ...this.state,
                    loading: false,
                    user: data
                })

            })
            .catch(err => {
                console.log(err)
            })

        } else {

            this.setState({
                ...this.state,
                loading: false,
                user: this.props.user.info
            })

        }

    }

    renderFameRating = () => {

        if (this.state.user.fame_rating >= 0) {

            return this.state.user.fame_rating

        }

    }

    render() {

        if (this.state.loading) {

            return (
                <div style={{width: '98vw', height: '98vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    Loading...
                </div>
            )

        } else {

            if (this.state.user.is_first_connection) {

                return (

                    <FirstConnection />
        
                )

            } else {

                return (

                    <div style={{width: '98vw', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
                        <div style={{width: '50vw', backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <div style={{width: 150, height: 150, borderRadius: 75, backgroundColor: 'white', border: '0.5px solid black', marginTop: 10}}>
                            </div>
                            <div style={{display: 'flex'}}>
                                <b style={{fontSize: 22, fontWeight: '500', margin: 5, marginRight: 10}}>{this.state.user.full_name}</b>
                                <b style={{fontWeight: '100', fontSize: 19, color: 'red'}}>{this.renderFameRating()}</b>
                            </div>
                            <b style={{margin: 5}}>{this.state.user.age} years old</b>
                            <p>{this.state.user.bio}</p>
                            <div>
                                <b>{this.state.user.gender} looking for {this.state.user.sexual_preferences}</b>
                            </div>
                            <div style={{width: '30vw', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                {
                                    this.state.user.interests.map((item, index) => (
                                        <div key={index}>
                                            {item}
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={{maxWidth: '30vw', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <div style={{display: 'flex'}}>
                                    <div style={{width: 360, height: 240, backgroundColor: 'red', margin: 5}}/>
                                    <div style={{width: 360, height: 240, backgroundColor: 'red', margin: 5}}/>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div style={{width: 360, height: 240, backgroundColor: 'red', margin: 5}}/>
                                    <div style={{width: 360, height: 240, backgroundColor: 'red', margin: 5}}/>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div style={{width: 360, height: 240, backgroundColor: 'red', margin: 5}}/>
                                </div>
                            </div>
                            <Button
                            onClick={() => this.props.changePage({text: 'EDIT_PROFILE', var: {}})}
                            >
                                Edit informations
                            </Button>
                        </div>
                    </div>
        
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

export default connect(mapStateToProps)(Profile)