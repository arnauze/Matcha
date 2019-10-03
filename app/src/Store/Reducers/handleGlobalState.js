var initialState = {
    user: {
        isConnected: false,
        info: {}
    }
}

export default function handleGlobalState(state = initialState, action) {

    var nextState

    switch(action.type) {

        case 'UPDATE_USER':
           if (action.value.user)  {
               nextState = {
                   ...state,
                   user: {
                       isConnected: true,
                       info: action.value.user
                   }
               }
           }
           return nextState || state

        case 'DISCONNECT_USER':
            nextState = {
                ...state,
                user: {
                    isConnected: false,
                    info: {}
                }
            }
            return nextState || state
            
        default:
            return state
    }

}