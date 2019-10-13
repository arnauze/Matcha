import React from 'react'
import { connect } from 'react-redux'
import { API } from 'aws-amplify'
import { Button } from '@material-ui/core'
import CurrentChat from '../Helpers/CurrentChat'

class Chat extends React.Component {

    state = {
        loading: true,
        currentChat: {},
        chatLoading: false
    }

    componentDidMount() {

        let apiName = 'Matcha'
        let path = '/chats/user/' + this.props.user.info.username
        let myInit = {}

        API.get(apiName, path, myInit)
        .then(data => {

            console.log("SUCCESSFULLY FETCHED THE USER'S CHAT")
            console.log(data)

            this.setState({
                ...this.state,
                loading: false,
                chats: data
            })

        })
        .catch(err => {
            console.log("ERROR FETCHING THE USER'S CHATS")
            console.log(err)
        })

    }

    changeChat = (item) => {
        
        this.setState({
            ...this.state,
            chatLoading: true
        })

        let apiName = 'Matcha'
        let path = '/chats/' + item.id
        let myInit = {}

        API.get(apiName, path, myInit)
        .then(data => {
            this.setState({
                ...this.state,
                currentChat: data,
                chatLoading: false
            })
        })
        .catch(err => {
            this.setState({
                ...this.state,
                currentChat: {},
                chatLoading: false
            })
        })

    }

    renderChats = () => {

        return (
            this.state.chats.map((item, index) => {

                return (
                    <Button
                    onClick={() => this.changeChat(item)}
                    style={{height: '7vh', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px black solid', margin: 10, marginRight: 20}}
                    key={index}
                    >
                        {item.full_name}
                    </Button>
                )

            })
        )

    }

    render() {

        if (this.state.loading) {

            return (
                <div style={{width: '98vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                    Loading...
                </div>
            )

        } else {

            return (
                <div style={{width: '98vw', display: 'flex', marginTop: 10, height: '98vh'}}>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '0.5px solid lightgray'}}>
                        {this.renderChats()}
                    </div>
                    <div style={{flex: 3, display: 'flex', justifyContent: 'center'}}>
                        <CurrentChat
                        chat={this.state.currentChat}
                        loading={this.state.chatLoading}
                        updateChat={() => this.changeChat(this.state.currentChat)}
                        />
                    </div>
                </div>
            )

        }

    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Chat)