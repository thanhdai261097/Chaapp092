const initState = {}
const userReducer = (state = initState, action) => { 
    switch( action.type ) { 
        ////
        case "CREATE_USER":
            console.log('Create USER success')
            return state
        case "CREATE_USER_ERROR":
            console.log('Create USER error', action.err);
            return state
        default: 
            return state
    }
}

export default userReducer