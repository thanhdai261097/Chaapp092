import React, { Component } from 'react';
import ChatHeader  from './ChatHeader'
import ListFriend from './ListFriend'
import {connect} from 'react-redux'
import { createConversation, sendMessage } from '../../Store/Actions/conversationActions';
import { setPriorityFriend } from '../../Store/Actions/userActions';
import MessageHistory from './MessageHistory';
import {  firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Loading from '../Loading/Loading';
import { IDMess } from '../../IDMessage/IDMess';
import {SearchName} from '../../IDMessage/Search'
//import { URLSearchParams } from 'url';


class ChatFrame extends Component {

    handleClickFriends(userLogged,userClicked) { 
        this.props.history.replace("../chat/"+userClicked.uid);  
    }
    handleStarFriend(userClicked) { 
        this.props.setPriorityFriend(userClicked)
    }

    handleCreateConversation(userLogged,userClicked) { 
        this.props.createConversation(userLogged,userClicked)
    }

    handleSendMessage (conversation,userLogged){
        
        const term = this.refs.tags.value;
        this.refs.tags.value = null
        
        var message = conversation.history
        var users =  conversation.users
        var date = new Date();
        var lastMilliseconds = date.getTime();
        
        message.push( {
            sendAt: lastMilliseconds,
            uid: userLogged.uid,
            text: term,
        })
        
        this.props.sendMessage(users[0].user,users[1].user,message)
    }

    handleSendMessageByEnter(event,fetchConversation,userLogged) { 
        
        var key = window.event.keyCode
        if (key === 13) {
            this.handleSendMessage (fetchConversation,userLogged)
            event.preventDefault();
            event.currentTarget.value = "";
        }
       
    }


    render() {
        
        const userLogged = this.props.auth
        const paramID = this.props.match.params.id

        const users = this.props.fireStore.users;
        const conversations = this.props.fireStore.conversations;
        //this.friends = users
        var name
        var friend
        if (!userLogged.uid){ 
            return (
                <div>
                    <div className = "flow-text center"> <br/> Welcome to chat app - 1512092 </div>
                </div>
                
            )
        }
        else if ( !users || !conversations)  { 
            
            console.log(typeof(conversations))
            return (
                <Loading/>
            )
        }
        else if ( userLogged ) {
            
            
            var hashCode = IDMess(paramID,userLogged.uid); 
            var listConversation = conversations.filter (each => each.id === hashCode.toString())
            const conversation = listConversation[0]
            
            console.log(conversation);
            
            return (
                <div>
                    
                    <div className="container">
                    <div className="people-list" id="people-list">
                            <div className="search">
                            <input type="text" placeholder="Search..." 
                            onChange = {e => {
                                e.preventDefault()
                                name = e.target.value
                              
                               console.log("afsdfasdfasfd: "+ name)
                                
                             friend = SearchName(userLogged,name,users)
                            this.friends = friend
                                if(name = "")
                                {
                                  //  friends = users
                                }
                           // console.log(users)
                           // console.log(this.friends)
                            console.log(this.friends)
                            
                            //users = friend
                            }}/>
                            
                        </div>
                        <ListFriend userLogged = {userLogged} users = {users} onClick = {this.handleClickFriends.bind(this)} />
                    </div>
                   
                    <div className="chat">
    
                        <ChatHeader  userLogged = {userLogged} conversations = {conversations} paramID = {paramID} users = {users} onClick = {this.handleStarFriend.bind(this)} />
                        
                        <MessageHistory userLogged ={userLogged} users = {users} conversations = {conversations} paramID = {paramID} onClick = {this.handleCreateConversation.bind(this)}/>
                        
                        { conversation?
                            <div className="chat-message clearfix">
                                <textarea onKeyPress = {(e) => this.handleSendMessageByEnter(e,conversation,userLogged)} name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3" name = "tag" ref= "tags"></textarea>
                                <button onClick = {() => this.handleSendMessage(conversation,userLogged)}>Send</button>   
                            </div>
                        :null}
                        
                    </div>

                    </div>
                    
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state) => { 
    console.log(state);
    return { 
        auth: state.firebase.auth,
        fireStore: state.firestore.ordered,
       friends: state.SearchName
    }
}

const mapDispatchToProps = (dispatch) => { 
    return {
        setPriorityFriend: (user) => dispatch (setPriorityFriend(user)),
        createConversation: (authUser,userClicked) => dispatch(createConversation(authUser,userClicked)),
        sendMessage:(authUID,paramUID,message) =>  dispatch(sendMessage(authUID,paramUID,message)),
        
    }
}
 
export default compose( 
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'conversations'}
    ])
)(ChatFrame)