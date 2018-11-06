import React, { Component } from 'react';
import {connect} from 'react-redux'
import {signIn, signInWithGoogle} from '../../Store/Actions/authActions'

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
        let authError = this.props.authError
        return (
            <div className = "container"> 
                <form onSubmit = {this.handleSubmit} className = "white"> 
                    

                    <GoogleButton onClick = {this.handleGoogleLogin}/>

                    

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => { 
    return { 
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => { 
    return { 
        signIn: (creds) => dispatch(signIn(creds)),
        signInWithGoogle: () => dispatch(signInWithGoogle()),
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Signin));