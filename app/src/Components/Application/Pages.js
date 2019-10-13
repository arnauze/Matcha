import React from 'react'
import TopBar from './Helpers/TopBar'
import MainPart from './Pages/MainPart'
import BottomBar from './Helpers/BottomBar'
import { connect } from 'react-redux'

class Pages extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            page: {
                text: props.isFirstConnection ? 'PROFILE' : 'BROWSING',
                var: {}
            }
        }

    }

    changePage = page => {

        // Function called when the user changes page

        if (!this.props.user.info.is_first_connection) {

            this.setState({
                ...this.state,
                page: {
                    text: page.text,
                    var: page.var
                }
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