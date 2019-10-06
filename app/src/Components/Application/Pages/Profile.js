import React from 'react'
import { connect } from 'react-redux'
import FirstConnection from '../Helpers/FirstConnection'

class Profile extends React.Component {

    renderFameRating = () => {

        if (this.props.user.info.fame_rating >= 0) {

            return this.props.user.info.fame_rating

        }

    }

    render() {

        if (this.props.user.info.is_first_connection) {

            return (

                <FirstConnection />
    
            )

        } else {

            return (

                <div style={{width: '98vw', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
                    <div style={{width: '50vw', backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column', alignItems: 'center', height: 400}}>
                        <div style={{width: 150, height: 150, borderRadius: 75, backgroundColor: 'white', border: '0.5px solid black', marginTop: 10}}>
                        </div>
                        <div style={{display: 'flex'}}>
                            <b style={{fontSize: 22, fontWeight: '500', margin: 5, marginRight: 10}}>{this.props.user.info.full_name}</b>
                            <b style={{fontWeight: '100', fontSize: 19, color: 'red'}}>{this.renderFameRating()}</b>
                        </div>
                        <p>{this.props.user.info.bio}</p>
                        <div style={{width: '30vw', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            {
                                this.props.user.info.interests.map(item => (
                                    <div>
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
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