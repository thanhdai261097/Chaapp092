
import { firebaseStateReducer } from "react-redux-firebase";
import * as Type from '../Actions/types'
export const signIn = (credentials) => { 
    return (dispatch , getState, {getFirebase}) => { 
        const firebase = getFirebase() ;
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password,
        ).then(() => 
            { 
            dispatch({
                type: Type.LOGIN_SUCCESS})
            }).catch((err)=> 
            { 
                dispatch({ 
                    type: Type.LOGIN_ERROR,
                    err:err,
            })
        })
    }
}

export const signInWithGoogle = (credentials) => { 
    return (dispatch, getState, {getFirebase}) => { 
        const firebase = getFirebase();
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(
            provider
        ).then(() => 
            { 
            dispatch({
                type: Type.LOGIN_GOOGLE_SUCCESS})
            }).catch((err)=> 
            { 
                dispatch({ 
                    type: Type.LOGIN_GOOGLE_ERROR,
                    err: err,
            })
        })  
        
    }
}

export const signOut = () => { 
    return (dispatch, getState, {getFirebase}) => { 
        const firebase = getFirebase();

        firebase.auth().signOut().then( () => {
            dispatch({
                type: Type.SIGN_OUT_SUCCESS
            })
        })
    }
}