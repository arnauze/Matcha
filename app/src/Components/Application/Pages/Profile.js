import React from 'react'
import { connect } from 'react-redux'
import FirstConnection from '../Helpers/FirstConnection'

class Profile extends React.Component {

    render() {

        if (this.props.user.info.is_first_connection) {

            return (

                <FirstConnection
                />
    
            )

        } else {

            return (

                <div style={{display: 'flex', width: '98vw', height: '98vh', alignItems: 'center', justifyContent: 'center'}}>
                    <p>
                        Profile
                    </p>
                </div>
    
            )

        }

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile)