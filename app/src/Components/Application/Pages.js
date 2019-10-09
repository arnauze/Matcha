import React from 'react'
import TopBar from './Helpers/TopBar'
import MainPart from './Pages/MainPart'
import BottomBar from './Helpers/BottomBar'
import { connect } from 'react-redux'

class Pages extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            page: props.isFirstConnection ? 'PROFILE' : 'BROWSING'
        }

    }

    changePage = page => {

        // Function called when the user changes page

        if (!this.props.user.info.is_first_connection) {

            this.setState({
                ...this.state,
                page: page
            })

        } else {

            alert("You need to complete your profile first !")

        }

    }

    render() {

        return (

            <React.Fragment>
                <TopBar
                changePage={this.changePage}
                />
                <MainPart
                page={this.state.page}
                changePage={this.changePage}
                />
                <BottomBar />
            </React.Fragment>

        )

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Pages)