import authReducer from './authReducer'
import  usersReducer from "./usersReducer"
import conversationReducer from "./conversationReducer"
import {combineReducers} from 'redux'
import { firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const Reducers = combineReducers( { 
    auth:authReducer,
    users: usersReducer,
    conversation: conversationReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default  Reducers