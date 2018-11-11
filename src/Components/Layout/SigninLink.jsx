import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Avatar from 'react-avatar'
import {connect} from "react-redux"
import {setUserOffline} from '../../Store/Actions/userActions'
import {signOut} from '../../Store/Actions/authActions'
import {Container} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class SigninLink extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
     
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }


      handleLogOut (userLogged) { 
        this.props.setUserOffline(userLogged)
          this.props.signOut()
         
      }
    render() {
        const userLogged = this.props.auth
        return (
        <Container>
        <ul className = "right">
            <li> <a to = "/signin" onClick = { () => {this.handleLogOut(userLogged)}}>Sign Out</a> </li>
            <li><Avatar src ={this.props.auth.photoURL} className = "right" size = {60} round = {true}/></li>
            <li> <a>{this.props.auth.displayName}</a></li>
            
        </ul>
        </Container>
        
        );
    }
}

const mapDispatchToProps = (dispatch) => { 
    return { 
        setUserOffline: (user) => dispatch(setUserOffline(user)),
        signOut: () => dispatch(signOut())
    }
}


const mapStateToProps = (state) => { 
    return { 
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SigninLink)