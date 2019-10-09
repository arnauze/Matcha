import React from 'react'
import { Button } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DeleteIcon from '@material-ui/icons/Delete'

export default class UserSummary extends React.Component {

    renderFameRating = (user) => {

        if (user.fame_rating >= 0) {

            return user.fame_rating

        }

    }

    render() {

        var user = this.props.user

        return (

            <div style={{width: '50vw', minHeight: '60vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '0.5px solid black', borderRadius: 10, justifyContent: 'center', position: 'relative'}}>
                <div style={{backgroundColor: 'white', border: '0.5px solid black', margin: 10, width: '6vw', height: '12vh', borderRadius: 120}}>
                </div>
                <div style={{display: 'flex'}}>
                    <Button>
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
                        <div style={{border: '0.5px solid lightgray', margin: 5, width: '17vw', height: '17vh'}}/>
                        <div style={{border: '0.5px solid lightgray', margin: 5, width: '17vw', height: '17vh'}}/>
                    </div>
                </div>
                <div style={{display: 'flex', width: '20vw', justifyContent: 'space-between', position: 'absolute', bottom: 0}}>
                    <Button onClick={() => this.props.onLikeClick(user)}>
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