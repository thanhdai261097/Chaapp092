import * as Type from "../Actions/Actiontypes"


export const createConversation = (authUser,Friend) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firestore = getFirestore();
        const IDMess = idMess(authUser.uid,Friend.uid)
        var hi = "Hello " + Friend.displayName
        var date = new Date(); 
        var time = date.getTime();
        firestore.collection('conversations').doc(IDMess.toString()).set({                    
            
            users:[
                {user: authUser},
                {user:  Friend}
            ],
            timeCreatedAt: time,
            lastMessage: 0,
            history: [{
                sendAt: time,
                text: hi,
                uid: authUser.uid
            }]

        }).then( () =>  { 
            dispatch({
                type: Type.CreateConversation,
            });
        }).catch((err) => {
            dispatch({
                type: Type.CreateConversationErr,
                err: err,
            });
        })
    }
}



export const sendMessage = (authUser,Friend,message) => { 
   
    
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        const firestore = getFirestore();

        const IDMess = idMess(authUser.uid,Friend.uid)
        var date = new Date(); // some mock date
        var lastTime = date.getTime();
        firestore.collection('conversations').doc(IDMess.toString()).update({                    
            history: message,
            lastMessageAt: lastTime
        }).then( () =>  { 
            dispatch({
                type: Type.SendMess,
            });
        }).catch((err) => {
            dispatch({
                type: Type.SendMessErr,
                err: err,
            });
        })  
    }
}
function idMess(a,b) { 
    var hashA = 0, hashB = 0
    for (var i = 0; i<a.length; i++){
        var tempA = a.charCodeAt(i)
        hashA +=  tempA
    }

    for (var j = 0; j<b.length; j++){
        var tempB = b.charCodeAt(j)
        hashB +=  tempB
    }
    return hashA+hashB
}