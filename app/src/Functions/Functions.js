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

export function startWebsocket(user, updateState, notifications) {

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

        notifications.push({data: event.data, timestamp: Date.now()})

        updateState({
            notifications: notifications
        })

    }

}