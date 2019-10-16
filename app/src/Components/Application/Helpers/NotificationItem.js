import React from 'react'

export default class NotificationItem extends React.Component {

    outputMessage = () => {

        switch(this.props.notification.type) {

            case 'new_connection':
                return 'You have a new connection with ' + this.props.notification.withUser
            case 'lost_connection':
                return this.props.notification.withUser + ' disliked you...'
            case 'new_like':
                return this.props.notification.withUser + ' liked you'
            case 'new_message':
                return 'You received a new message from ' + this.props.notification.withUser
            case 'new_visit':
                    return this.props.notification.withUser + ' visited your profile'
            default:
                return 'OTHER'

        }

    }

    render() {

        return (
            <div style={{borderBottom: '0.5px solid lightgray', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: this.props.notification.seen ? 'white' : 'lightgray'}}>
                <div
                style={{height: 50, display: 'flex', alignItems: 'center', margin: 7}}
                >
                    <b style={{fontWeight: 'normal'}}>{this.outputMessage()}</b>
                </div>
            </div>
        )

    }

}