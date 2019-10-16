import React from 'react'
import { Button } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DeleteIcon from '@material-ui/icons/Delete'
import { API } from 'aws-amplify'
import { connect } from 'react-redux'

class UserSummary extends React.Component {

    renderFameRating = (user) => {

        if (user.fame_rating >= 0) {

            return user.fame_rating

        }

    }

    onLikeClick = () => {

        let apiName = 'Matcha'
        let path = '/users/' + this.props.connectedUser.info.username + '/like/' + this.props.user.username
        let myInit = {}

        API.post(apiName, path, myInit)
        .then(data => {

            console.log("Success!")
            console.log(data)

            this.props.reload()

        })
        .catch(err => {

            console.log("Error liking the user")
            console.log(err)

        })

    }

    navigateToFriendProfile = username => {

        let apiName = 'Matcha'
        let path = '/users/' + this.props.connectedUser.info.username + '/visit/' + this.props.user.username
        let myInit = {}

        API.post(apiName, path, myInit)
        .then(data => {

            console.log("Success!")
            console.log(data)

        })
        .catch(err => {

            console.log("Error visiting the user")
            console.log(err)

        })

        let page = {
            text: 'FRIEND_PROFILE',
            var: {username: username}
        }
        this.props.changePage(page)

    }

    render() {

        var user = this.props.user

        return (

            <div style={{width: '50vw', minHeight: '60vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '0.5px solid black', borderRadius: 10, justifyContent: 'center', position: 'relative'}}>
                <img
                style={{backgroundColor: 'white', border: '1px solid black', margin: 10, width: '6vw', height: '12vh', borderRadius: 120}}
                src={user.profile_picture}
                alt=""
                />
                <div style={{display: 'flex'}}>
                    <Button onClick={() => this.navigateToFriendProfile(user.username)}>
                        <b style={{fontSize: '1vw', fontWeight: '500', margin: 5, marginRight: 10}}>{user.full_name}</b>
                    </Button>
                    <b style={{fontWeight: '100', fontSize: '0.7vw', color: 'red'}}>{this.renderFameRating(user)}</b>
                </div>
                <b style={{margin: 5, fontSize: '0.8vw'}}>{user.age} years old</b>
                <p style={{fontSize: '0.8vw'}}>{user.bio}</p>
                <div style={{width: '30vw', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    {
                        user.interests.map((item, index) => (
                            <div key={index}>
                                <b style={{fontSize: '0.7vw'}}>
                                    {item}
                                </b>
                            </div>
                        ))
                    }
                </div>
                <div style={{maxWidth: '30vw', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{display: 'flex'}}>
                        {
                            user.medias ? user.medias.map((item, index) => {
                                if (index < 3) {
                                    return (
                                        <img alt="" src={item} key={index} style={{border: '1px solid lightgray', margin: 5, width: '12vw', height: '14vh'}}/>
                                    )
                                }
                            }) : null
                        }
                    </div>
                </div>
                <div style={{display: 'flex', width: '20vw', justifyContent: 'space-between', position: 'absolute', bottom: 0}}>
                    <Button onClick={() => this.onLikeClick(user)}>
                        <FavoriteIcon
                        color="secondary" 
                        style={{ fontSize: '2vw' }}
                        />
                    </Button>
                    <Button onClick={() => this.props.onDeleteClick(user)}>
                        <DeleteIcon
                        color="secondary" 
                        style={{ fontSize: '2vw' }}
                        />
                    </Button>
                </div>
            </div>

        )

    }

}

const mapStateToProps = state => {
    return {
        connectedUser: state.user
    }
}

export default connect(mapStateToProps)(UserSummary)