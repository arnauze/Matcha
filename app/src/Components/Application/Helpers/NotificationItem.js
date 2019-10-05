import React from 'react'

export default class NotificationItem extends React.Component {

    render() {

        return (
            <div style={{borderBottom: '0.5px solid lightgray'}}>
                <div
                style={{height: 50, display: 'flex', alignItems: 'center', margin: 7}}
                >
                    <b>{this.props.notification}</b>
                </div>
            </div>
        )

    }

}