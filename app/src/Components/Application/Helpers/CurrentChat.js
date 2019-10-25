import React from 'react'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { API } from 'aws-amplify'

class CurrentChat extends React.Component {

    sendMessage = () => {

        let apiName = 'Matcha'
        let path = '/chats/' + this.props.chat.id
        let myInit = {
            body: {
                message: {
                    text: this.state.message,
                    username: this.props.user.info.username,
                    timestamp: Date.now()
                }
            }
        }

        API.post(apiName, path, myInit)
        .then(data => {
            console.log("Success adding the message to the database")
            console.log(data)
            this.props.updateChat()
        })
        .catch(err => {
            console.log(err)
        })

    }

    changeMessage = (text) => {

        this.setState({
            ...this.state,
            message: text
        })

    }

    outputConversation = () => {

        var messages = this.props.chat.messages

        return (
            messages.map((item, index) => {

                return (

                    <div key={index} style={{minHeight: 40, maxWidth: 200, minWidth: 100, backgroundColor: item.username ===this.props.user.info.username ? 'lightblue' : 'magenta', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: item.username === this.props.user.info.username ? 'flex-end' : 'flex-start', right: 0, margin: 5}}>
                        <b style={{fontWeight: 'normal', margin: 7}}>{item.text}</b>
                    </div>

                )

            })
        )

    }

    render() {

        if (this.props.reloadChat) {

            this.props.updateChat()

            let action = {
                type: 'RELOAD_CHAT'
            }
            this.props.dispatch(action)

        }

        if (this.props.loading) {
         
            return "Loading..."
            
        } else {

            if (!this.props.chat || !this.props.chat.id) {

                return "You can chat with someone by clicking on his name"

            } else {

                return (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, margin: 10}}>
                        {
                            this.outputConversation()
                        }
                        <div style={{position: 'absolute', bottom: 110, height: '10vh', width: '40vw', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                            <input style={{height: '8vh', width: '30vw', border: '0.5px solid gray'}} onChange={(e) => this.changeMessage(e.target.value)}/>
                            <Button
                            onClick={this.sendMessage}
                            variant="contained"
                            color="primary"
                            style={{width: '5vw', height: '4vh'}}
                            >
                                Send
                            </Button>
                        </div>
                    </div>

                )

            }

        }

    }

}

const mapStateToProps = state => {
    return {
        user: state.user,
        reloadChat: state.reloadChat
    }
}

export default connect(mapStateToProps)(CurrentChat)