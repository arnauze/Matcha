import React from 'react'
import Browsing from './Browsing'
import Profile from './Profile'
import Search from './Search'
import EditProfile from '../Helpers/EditProfile'

export default class MainPart extends React.Component {

    dispatchPage = () => {

        switch(this.props.page) {

            case 'BROWSING':
                return (
                    <Browsing
                    changePage={this.props.changePage}
                    />
                )

            case 'PROFILE':
                return (
                    <Profile
                    changePage={this.props.changePage}
                    />
                )

            case 'SEARCH':
                return (
                    <Search />
                )

            case 'EDIT_PROFILE':
                return (
                    <EditProfile />
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