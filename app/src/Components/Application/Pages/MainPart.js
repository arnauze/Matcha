import React from 'react'
import Browsing from './Browsing'

export default class MainPart extends React.Component {

    dispatchPage = () => {

        switch(this.props.page) {

            case 'BROWSING':
                return (
                    <Browsing />
                )

        }

    }

    render() {

        return (

            <div>
                { this.dispatchPage()}
            </div>

        )

    }

}