import React from 'react'
import FirstConnection from './FirstConnection'

export default class EditProfile extends React.Component {

    render() {

        return (
            <div style={{margin: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '98vw'}}>
                <FirstConnection />
            </div>
        )

    }

}