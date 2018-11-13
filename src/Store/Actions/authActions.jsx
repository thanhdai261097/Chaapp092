import * as Type from "../Actions/Actiontypes"

export const signInWithGoogle = (credentials) => { 
    return (dispatch, getState, {getFirebase}) => { 
        const firebase = getFirebase();
        const provider = new firebase.auth.GoogleAuthProvider()
    

        firebase.auth().signInWithPopup(
            provider
        ).then(() => 
            {          
            dispatch({
                type: Type.Login})
            }).catch((err)=> 
            { 
                dispatch({ 
                    type: Type.LoginErr,
                    err:err,
            })
        })
        
        
    }
}

export const signOut = () => { 
    return (dispatch, getState, {getFirebase}) => { 
        const firebase = getFirebase();
         
        firebase.auth().signOut().then( () => {
            dispatch({
                type: Type.SignOut
            })
        })
    }  
}
