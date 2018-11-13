import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';
import Avatar from 'react-avatar';


import {HashUID} from '../../IDMessage/HashID'


var buttonStyle = {
    backgroundColor: "Transparent",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline:"none"
}


const ChatHeader = ({userLogged, conversations, paramID, users,onClick}) => { 

        var list = users.filter( each=> each.id === paramID) 
        var friend = list[0]

        if (isEmpty(friend)) { 
            return (
                <div className="chat-header clearfix">
                <Avatar src="http://voice4thought.org/wp-content/uploads/2016/08/default2-1.jpg" className = "left" size = {50} round = {true}/>
                </div>
            );
        }
        else {
            var hashCode = HashUID(paramID,userLogged.uid); 
            var listConversation = conversations.filter (each => each.id === hashCode.toString())
            const conversation = listConversation[0]
             
            
        return (
            <div className="chat-header clearfix">
            
            <Avatar src={friend.photoURL} size ={50} className ="left" round={true}/>
            <div className="chat-about">
                <div className="chat-with ">{friend.displayName}</div>
                {conversation? <div className="chat-num-messages left">already {conversation.history? conversation.history.length:0} messages</div>:<div className="chat-num-messages left">no messages</div> }
            </div>
         <button style = {buttonStyle}onClick ={() => onClick(friend)}>{friend.priority === true?<i className="fa fa-star center"></i>:<i className="fa fa-star-o center"></i>}</button>
        </div>
        );
    }
}

export default ChatHeader;