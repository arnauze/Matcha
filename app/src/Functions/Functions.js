export function sendNotification(action, data) {

    var ws = new WebSocket('wss://30gbtaal39.execute-api.us-east-2.amazonaws.com/dev')

    ws.onopen = (event) => {
        let send = {
            "action": action,
            "data": data
        }
        ws.send(JSON.stringify(send))
    }

}

export function startWebsocket(user, updateState, notifications, updateUser, reloadChat) {

    var ws = new WebSocket('wss://30gbtaal39.execute-api.us-east-2.amazonaws.com/dev')

    ws.onopen = (event) => {

        console.log("CONNECTION")
        console.log(event)

        let send = {
            "action": "connectUser",
            "data": user
        }

        ws.send(JSON.stringify(send)); 

    };

    ws.onmessage = (event) => {

        console.log("NEW MESSAGE:")
        console.log(event)

        var body = JSON.parse(event.data)
        var message

        switch(body.type) {

            case 'connection':
                if (body.data === 'delete_connection') {
                    message = 'You lost a connection with ' + body.from + '!'
                } else if (body.data === 'new_connection') {
                    message = 'You got a new a connection with ' + body.from + '!'
                } else if (body.data === 'new_like') {
                    message = body.from + ' just liked you!'
                }
                break;
            case 'message':
                message = 'You got a new message from ' + body.from + '!'
                reloadChat()
                break;
            case 'visit':
                message = body.from + ' just visited your profile!'
                break;
            default:
                message = "Error"

        }

        var newItem = {data: message, timestamp: Date.now()}
        notifications.push(newItem)

        updateState({
            notifications: notifications.filter(item => item === newItem)
        }, () => updateUser())

    }

}