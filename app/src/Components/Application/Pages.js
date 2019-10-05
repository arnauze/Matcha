import React from 'react'
import TopBar from './Helpers/TopBar'
import MainPart from './Pages/MainPart'
import BottomBar from './Helpers/BottomBar'

export default class Pages extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            page: props.isFirstConnection ? 'PROFILE' : 'BROWSING'
        }

    }

    changePage = page => {

        // Function called when the user changes page

        this.setState({
            ...this.state,
            page: page
        })

    }

    render() {

        return (

            <React.Fragment>
                <TopBar
                changePage={this.changePage}
                />
                <MainPart
                page={this.state.page}
                />
                <BottomBar />
            </React.Fragment>

        )

    }

}