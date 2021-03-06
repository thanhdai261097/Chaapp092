import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';
import Loading from '../Loading/Loading';
import moment from 'moment';
import Avatar from 'react-avatar';
import SearchName from '../../IDMessage/Search'

var buttonStyle = {
    backgroundColor: "Transparent",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline:"none"
}

const ListFriend = ({userLogged, users, onClick}) => { 
    console.log(users);
    var friends = users;
    var name
 
    if(isEmpty(friends)) { 
        return (
       
            <Loading/>
        
        )
    }
    else {
        friends = friends.filter(function( obj ) {
            return obj.uid !== userLogged.uid ;
        });

        friends.sort((a,b) => { 
            if (a.status > b.status)
                return -1;
            if (a.status < b.status)
                return 1;
            return (a.priority === b.priority)? 0 : a.priority? -1 : 1;
            
        })

        friends.sort((a,b) => { 
            if (a.status === "offline" && b.status === "offline") {
                if (a.lastLoginAt > b.lastLoginAt)
                    return -1;
                if (a.lastLoginAt < b.lastLoginAt)
                    return 1;
                return 0
            }
        })
    
        
        
        return (
             
         
            
                <ul className="list">
                    {friends.map((each,index) => {
                        
                        const sec = parseInt(each.lastLoginAt)
                        const date = new Date(sec)
                        
                        return (
                            <button style = {buttonStyle} key = {index} onClick = {() => onClick   (userLogged,each)}>
                            <li className="clearfix" key={index}>
                            
                            <Avatar size="50"  src={each.photoURL}  className ="left" round = {true}/>
                            <div className="about">
                                {each.priority === true ?
                                <div className="name white-text ">{each.displayName}<i className="fa fa-star online right"></i></div>
                                :<div className="name white-text">{each.displayName}</div>}

                                <div className="status">
                                {each.status === "online"? <div>{each.status} <i className="fa fa-circle online"></i> </div> : <div> online {moment(date).fromNow() } <i className="fa fa-circle offline"></i></div>}

                                </div>
                            </div>
                            
                            </li>
                            </button>
                        )
                    })}
                </ul>
                
            )
        }
}

export default ListFriend;