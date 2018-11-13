import React from 'react';
import { isEmpty } from 'react-redux-firebase';
import moment from 'moment';
import { IDMess } from '../../IDMessage/IDMess';
import Avatar from 'react-avatar'
import isUrl from "is-url"

var buttonStyle = {
  backgroundColor: "Transparent",
  border: "none",
  cursor: "pointer",
  overflow: "hidden",
  outline:"none"
}

var linkImageStyle = {
  wordWrap: "break-word",
} 

var imageStyle ={ 
  width : "auto",
  height : "auto",
  maxWidth: "100%",
}

const MessageHistory  = ({userLogged, users, conversations, paramID, onClick, }) => {

  var list = users.filter( each=> each.id === paramID) 
  var friend = list[0]

  
   if (isEmpty(friend)) {
    return (
      <div className = "card-action grey lighten-4 grey-text center flow-text">Click avatar, you can chat with your friend</div>
    )
    }
    else if(paramID === "t") {

        return (
          <div className = "card-action grey lighten-4 grey-text center flow-text">Click avatar, you can chat with your friend</div>
        )
 
    
  }
  else {
      var hashCode = IDMess(paramID,userLogged.uid);
      var listConversation = conversations.filter (each => each.id === hashCode.toString())
      const conversation = listConversation[0];
      console.log("asdasdf")
      //console.log(console.log(conversation.users[0]["user"].displayName))
             
      if ( conversation) 
      {
        conversation.history.map ( each => { 
            if ( each.uid === userLogged.uid) 
            { 
              each.position = "right"
              each.displayName = userLogged.displayName
              each.photoURL = userLogged.photoURL
            }
            else {
              each.position = "left"
              if(conversation.users[0]["user"].uid === userLogged.uid)
              {
               each.photoURL = conversation.users[1]["user"].photoURL
               each.displayName = conversation.users[1]["user"].displayName
              }
              else{
                each.photoURL = conversation.users[0]["user"].photoURL
                each.displayName = conversation.users[0]["user"].displayName
              }
            }
        })

        return (
              <div>
                  <div className="chat-history">
                    <ul>
                      {conversation.history.map((each,index) => {

                          const sec = parseInt(each.sendAt)
                          const date = moment(new Date(sec)).format('LT')  + " - "  + moment(new Date(sec)).format('l')

                          if(each.position === "right") { 
                            return (
                            
                                  <li className="clearfix" key = {index}>

                                      <div className="message-data align-right">
                                        <span className="message-data-time" >{date}</span> &nbsp; &nbsp;
                                        <span className="message-data-name" >{each.displayName}</span> <i className="fa fa-circle me"></i>
                                      </div>

                                      <div className="message other-message right ">
                                          <div className = "right">
                                          {isUrl(each.text) ?
                                        <div style = {linkImageStyle} >
                                        {(each.text.search("firebasestorage") > 0) ? null  :<a style = {linkImageStyle} target="_blank" rel="noopener noreferrer" href={each.text}>{each.text}</a>}
                                        
                                        <a style = {linkImageStyle} target="_blank" rel="noopener noreferrer" href={each.text}><img style ={imageStyle} src = {each.text}  alt = {each.text}></img> </a>
                                        </div>
                                        :
                                        <div> {each.text}</div> 
                                         }
                                           </div>
                                      </div>
                                  </li>
                            )
                          }

                          else  { 
                            return(
                                <li className = "clearfix" key = {index}> 
                                  <div className="message-data">
                                  <Avatar src={each.photoURL} size ={35} className ="left" round={true}/> &nbsp; &nbsp;
                                  <i className="fa fa-circle online"></i>  <span className="message-data-name">{each.displayName}</span>
                                      <span className="message-data-time">{date}</span>

                                  </div>
                                  <div className="message my-message left">
                                  {isUrl(each.text) ?
                                        <div style = {linkImageStyle} >
                                        {(each.text.search("firebasestorage") > 0) ? null  :<a style = {linkImageStyle} target="_blank" rel="noopener noreferrer" href={each.text}>{each.text}</a>}
                                        
                                        <a style = {linkImageStyle} target="_blank" rel="noopener noreferrer" href={each.text}><img style ={imageStyle} src = {each.text}  alt = {each.text}></img> </a>
                                        </div>
                                        :
                                        <div> {each.text}</div> 
                                  }
                                  </div>
                                </li>
                            )
                          }
                      })}
                    </ul>  
                  </div>
              </div>
        );
      } else { 
        return(
          <button style = {buttonStyle} onClick ={ () => onClick(userLogged,friend)}><div className = "card-action grey lighten-4 grey-text center flow-text">You and him have no any conversation yet. CLick here to make contact</div></button>
        )
        
      }
  }
}

export default MessageHistory;