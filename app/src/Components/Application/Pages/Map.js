import React from 'react'
import { Map as GMap, Marker, GoogleApiWrapper } from 'google-maps-react'
import { connect } from 'react-redux'
import { apiKey } from '../../../Constants/Constants'
import { API } from 'aws-amplify'


class Map extends React.Component {

    state = {
        loading: true
    }

    componentDidMount() {

        let apiName = 'Matcha'
        let path = '/users'
        let myInit = {}

        API.get(apiName, path, myInit)
        .then(data => {
            console.log("Success fetching the users")
            console.log(data)
            this.setState({
                ...this.state,
                loading: false,
                users: data.Items
            })
        })
        .catch(err => {
            console.log("Error fetching the users")
            console.log(err)
        })

    }

    render() {

        var user = this.props.user.info

        return (

            <div style={{height: '92vh', width: '100vw', bottom: 100}}>
                <GMap
                google={this.props.google}
                center={{lat: user.userLocation.lat, lng: user.userLocation.lng}}
                zoom={13}
                >
                    {
                        this.state.loading
                        ?
                            null
                        :
                            this.state.users.map((item, index) => {
                                return (
                                    <Marker
                                    onClick={() => item.username !== this.props.user.info.username ? this.props.changePage({text: "FRIEND_PROFILE", var: {username: item.username}}) : null}
                                    key={index}
                                    title={item.full_name}
                                    position={{lat: item.userLocation.lat, lng: item.userLocation.lng}}
                                    options={{icon: item.username===this.props.user.info.username ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" : "http://maps.google.com/mapfiles/ms/icons/pink-dot.png"}}
                                    />
                                )
                            })    
                    }
                </GMap>
            </div>

        )

    }

}

var newMap = connect(state => {return { user: state.user }})(Map)

export default GoogleApiWrapper({ apiKey: apiKey})(newMap)