import * as Type from "../Actions/Actiontypes"

const initState = {}
const usersReducer = (state = initState, action) => { 
    switch( action.type ) { 
        case Type.CreateUser:
            return state;
        case Type.CreateUserErr:
            return state;
        case Type.SetUserOnline:
            return state;
        case Type.SetUserOnlineErr:
            return state;
        case Type.SetUserOffline:
            return state;
        case Type.SetUserOfflineErr:
            return state;   
        case Type.SetStar:
            return state;
        case Type.SetStarErr:
            return state;  

        default:
            return state
    }
    
}

export default usersReducer