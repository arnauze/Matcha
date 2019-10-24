import { apiKey } from '../Constants/Constants'
//import axios from 'axios'

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

export function fromGeolocationToAddress(lat, lng) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + apiKey
    return fetch(url).then((response) => response.json())
}

export function distance(lat1,lon1,lat2,lon2) {
	var R = 6371; 
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	if (d>1) {
        console.log(Math.round(d))
        return Math.round(d);
    } else if (d<=1) {
        console.log(Math.round(d*1000))
        return Math.round(d*1000);
    }
	return d;
}
