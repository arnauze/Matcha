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

export function startWebsocket(user, updateState, notifications, updateUser) {

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
                if (body.data === 'delete') {
                    message = 'You lost a connection with ' + body.from + '!'
                } else {
                    message = 'You got a new a connection with ' + body.from + '!'
                }
                break;
            default:
                message = "Error"

        }

        notifications.push({data: message, timestamp: body.timestamp})



        updateState({
            notifications: notifications
        }, () => updateUser())

    }

}