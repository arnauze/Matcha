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

    getUser = () => {

        this.setState({
            ...this.state,
            loading: true
        })

        let apiName = 'Matcha'
        let path = '/users/' + this.props.user.info.username
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

                    <FirstConnection
                    update={this.getUser}
                    />
        
                )

            } else {

                return (

                    <div style={{width: '98vw', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
                        <div style={{width: '50vw', backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <img
                            src={this.state.user.profile_picture}
                            alt=""
                            style={{width: 150, height: 150, borderRadius: 75, backgroundColor: 'white', border: '1px solid black', marginTop: 10}}
                            />
                            <div style={{display: 'flex'}}>
                                <b style={{fontSize: 22, fontWeight: '500', margin: 5, marginRight: 10}}>{this.state.user.full_name}</b>
                                <b style={{fontWeight: '100', fontSize: 19, color: 'red'}}>{this.renderFameRating()}</b>
                            </div>
                            <b style={{margin: 5}}>{this.state.user.age} years old</b>
                            <p>{this.state.user.bio}</p>
                            <b style={{color: 'blue'}}>{this.state.user.userLocation.address.split(',')[1].substr(1)}</b>
                            <p>
                                <b>{this.state.user.gender} looking for {this.state.user.sexual_preferences}</b>
                            </p>
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
                                    {
                                        this.state.user.medias.map((item, index) => {
                                            if (index < 2) {
                                                return (
                                                    <img src={item} alt="" key={index} style={{maxWidth: 360, maxHeight: 240, margin: 10}}/>
                                                )
                                            } else return null
                                        })
                                    }
                                </div>
                                <div style={{display: 'flex'}}>
                                    {
                                        this.state.user.medias.map((item, index) => {
                                            if (index >= 2 && index < 4) {
                                                return (
                                                    <img src={item} alt="" key={index} style={{maxWidth: 360, maxHeight: 240, margin: 10}}/>
                                                )
                                            } else return null
                                        })
                                    }
                                </div>
                                <div style={{display: 'flex'}}>
                                    {
                                        this.state.user.medias.map((item, index) => {
                                            if (index === 4) {
                                                return (
                                                    <img src={item} alt="" key={index} style={{maxWidth: 360, maxHeight: 240, margin: 10}}/>
                                                )
                                            } else return null
                                        })
                                    }
                                </div>
                            </div>
                            {
                                this.props.isFriendProfile
                                ?
                                    null
                                :
                                    <React.Fragment>
                                        <Button
                                        onClick={() => this.props.changePage({text: 'EDIT_PROFILE', var: {}})}
                                        >
                                            Edit informations
                                        </Button>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Button
                                            onClick={() => this.props.changePage({text: 'USER_LIST', var: { type: '/like', users: this.state.user.likes, key: "likes", pageName: "Who you like" }})}
                                            variant="contained"
                                            color="primary"
                                            style={{margin: 5}}
                                            >
                                                Who you like
                                            </Button>
                                            <Button
                                            onClick={() => this.props.changePage({text: 'USER_LIST', var: { type: '/userLikes', users: this.state.user.userLikes, key: "userLikes", pageName: "Who likes you" }})}
                                            variant="contained"
                                            color="primary"
                                            style={{margin: 5}}
                                            >
                                                Who likes you
                                            </Button>
                                            <Button
                                            onClick={() => this.props.changePage({text: 'USER_LIST', var: { type: '/connections', users: this.state.user.connections, key: "connections", pageName: "Your connections" }})}
                                            variant="contained"
                                            color="primary"
                                            style={{margin: 5}}
                                            >
                                                Your connections
                                            </Button>
                                            <Button
                                            onClick={() => this.props.changePage({text: 'USER_LIST', var: { type: '/historic', users: this.state.user.visit_historic, key: "visit_historic", pageName: "Visit historic" }})}
                                            variant="contained"
                                            color="primary"
                                            style={{margin: 5}}
                                            >
                                                Visit historic
                                            </Button>
                                        </div>
                                    </React.Fragment>
                            }
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