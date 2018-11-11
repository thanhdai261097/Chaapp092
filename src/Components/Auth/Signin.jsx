import React, { Component } from 'react';
import {connect} from 'react-redux'
import {signInWithGoogle} from '../../Store/Actions/authActions'

import GoogleButton from 'react-google-button'
import  {withRouter} from 'react-router-dom'




class Signin extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            email: '',
            password:'',
        }
    }
    
    handleChange = (e) =>  {
        this.setState({
            [e.target.id] : e.target.value
        })
        
    }
    
    handleGoogleLogin = (e) => { 
        e.preventDefault();
        this.props.signInWithGoogle();
        this.props.history.replace('/');
        
        
    }
    handleSubmit = (e) =>  {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        return (
            <div className = "container">
            
             <div className = "flow-text center"> <br/> Welcome to chat app - 1512092 </div>
                <br/>
            <center>
                    <div>You can sign in with Google </div>
                        <br/>
                                <GoogleButton onClick = {this.handleGoogleLogin}/>
                        <br/>
            </center>
         </div> 
     
        )
      }
}

const mapStateToProps = (state) => { 
    return { 
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => { 
    return { 
        signInWithGoogle: () => dispatch(signInWithGoogle()),
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Signin));