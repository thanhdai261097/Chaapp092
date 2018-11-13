import * as Type from "../Actions/Actiontypes"


export const createUser = (user) => {
    
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firestore = getFirestore();
        firestore.collection('users').doc(user.uid).set({                    
            ...user,
            status: "online",
            priority: false,
            friends: [],
            lastLoginAt: null,
        }).then( () =>  { 
            dispatch({
                type: Type.CreateUser,
            });
        }).catch((err) => {
            dispatch({
                type: Type.CreateUserErr,
                err: err,
            });
        })
    }
}



export const setUserOnline = (userAuth) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firestore = getFirestore(); 


        firestore.collection('users').doc(userAuth.uid.toString()).update({
            status: "online",
        }).then (() =>{ 
            dispatch({ 
                type: Type.SetUserOnline,
            })
        }).catch((err) => {
            dispatch({ 
                type: Type.SetUserOnlineErr,
                err: err,
            })
        })

    }
}


export const setUserOffline = (userAuth) => { 
    return (dispatch, getState, {getFirebase, getFirestore}) => { 
        
        var date = new Date(); 
        var lastMilliseconds = date.getTime();

        const firestore = getFirestore();

        firestore.collection('users').doc(userAuth.uid.toString()).update({
            status: "offline",
            lastLoginAt: lastMilliseconds,
        }).then (() =>{ 
            dispatch({ 
                type: Type.SetUserOffline,
            })
        }).catch((err) => {
            dispatch({ 
                type: Type.SetUserOfflineErr,
                err: err,
            })
        })

    }
}


export const setPriorityFriend = (userAuth) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firestore = getFirestore();
        firestore.collection('users').doc(userAuth.uid.toString()).update({
            priority: !userAuth.priority,
        }).then (() =>{ 
            dispatch({ 
                type: Type.SetStar,
            })
        }).catch((err) => {
            dispatch({ 
                type: Type.SetStarErr,
                err: err,
            })
        })

    }
}
