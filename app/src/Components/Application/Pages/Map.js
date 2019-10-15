import React from 'react'
import { Map as GMap, Marker, GoogleApiWrapper } from 'google-maps-react'
import { connect } from 'react-redux'
import { apiKey } from '../../../Constants/Constants'

class Map extends React.Component {

    render() {

        var user = this.props.user.info

        return (

            <div style={{height: '92vh', width: '100vw', bottom: 100}}>
                <GMap
                google={this.props.google}
                center={{lat: user.userLocation.lat, lng: user.userLocation.lng}}
                zoom={13}
                >
                    <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    position={{lat: user.userLocation.lat, lng: user.userLocation.lng}}
                    />
                </GMap>
            </div>

        )

    }

}

var newMap = connect(state => {return { user: state.user }})(Map)

export default GoogleApiWrapper({ apiKey: apiKey})(newMap)