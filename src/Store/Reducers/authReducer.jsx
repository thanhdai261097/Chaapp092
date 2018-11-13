import * as Type from "../Actions/Actiontypes"

const initState = {}

const authReducer = (state = initState, action) => { 
    switch( action.type ) { 

        case Type.LoginErr : 
            return {
                ...state,
                authError: "Login Google Failed"
            }
        case Type.Login:
            return { 
                ...state,
                authError: null,
                
            }

        case Type.SignOut:
            return state
            

        default:
            return state      
    }
}

export default authReducer