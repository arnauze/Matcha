import React from 'react'
import Browsing from './Browsing'
import Profile from './Profile'
import Search from './Search'

export default class MainPart extends React.Component {

    dispatchPage = () => {

        switch(this.props.page) {

            case 'BROWSING':
                return (
                    <Browsing />
                )

            case 'PROFILE':
                return (
                    <Profile />
                )

            case 'SEARCH':
                return (
                    <Search />
                )

            default:
                return null
        }

    }

    render() {

        return (

            <div style={{position: 'absolute', top: 60}}>
                { this.dispatchPage()}
            </div>

        )

    }

}