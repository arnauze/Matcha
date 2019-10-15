import React from 'react'
import { API } from 'aws-amplify'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'

class UserList extends React.Component {

    state = {
        loading: true,
        users: []
    }

    componentDidMount() {

        let apiName = 'Matcha'
        let path = '/users/' + this.props.user.info.username + this.props.type
        let myInit = {
            queryStringParameters: {
                key: this.props.theKey
            }
        }

        console.log("MY INIT",myInit)

        API.get(apiName, path, myInit)
        .then(data => {
            console.log("SUCCESS GETTING THE LIST")
            console.log(data)
            this.setState({
                ...this.state,
                loading: false,
                users: this.props.theKey === "visit_historic" ? data.reverse() : data
            })
        })
        .catch(err => {
            console.log("ERROR GETTING THE LIST")
            console.log(err)
        })

    }

    onClick = (username) => {

        let apiName = 'Matcha'
        let path = '/users/' + this.props.user.info.username + '/visit/' + username
        let myInit = {}

        API.post(apiName, path, myInit)
        .then(data => {
            console.log("Success!")
            console.log(data)
        })
        .catch(err => {
            console.log("Error visiting the user")
            console.log(err)
        })

        let page = {
            text: 'FRIEND_PROFILE',
            var: {username: username}
        }
        this.props.changePage(page)

    }

    render() {

        if (this.state.loading) {

            return (
                <div style={{width: '98vw', height: '98vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    Loading...
                </div>
            )

        } else {

            return (

                <div style={{width: '98vw', height: '98vh', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute'}}>
                    <h3>{this.props.pageName}</h3>
                    {
                        this.state.users.map((item, index) => (

                            <Button
                            key={index}
                            onClick={() => this.onClick(item.username)}
                            >
                                {item.full_name}
                            </Button>

                        ))
                    }
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

export default connect(mapStateToProps)(UserList)