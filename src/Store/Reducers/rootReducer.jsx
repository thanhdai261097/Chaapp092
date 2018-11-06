import authReducer from './authReducer'


import {combineReducers} from 'redux'
import { firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import userReducer from '../Reducers/userReducers'

const rootReducer = combineReducers( { 
    auth:authReducer,
    user: userReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default  rootReducer