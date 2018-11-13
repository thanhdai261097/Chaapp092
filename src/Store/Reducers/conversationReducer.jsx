import * as Type from "../Actions/Actiontypes"

const initState = {}
const conversationReducers = (state = initState, action) => { 
    switch( action.type ) { 
        case Type.CreateConversation:
            return state;
        case Type.CreateConversationErr:
            return state;        
        case Type.GetConversation:
            return {
                conversation: action.conversation,
                userClicked: action.userClicked
            }
                
        case Type.GetConversationErr:
            return state;
                  
        case Type.SendMess:
            return action.conversation;
        case Type.SendMessErr:
            return state;


        default:
            return state
    }
    
}

export default conversationReducers