import React,{Component} from 'react'
import Welcome from './Notipage'
import {connect} from "react-redux"
import Message from '../Message/message'
import '../css/style.css'
import firebase from '../../Config/firebaseConfig'
class Dashboard extends Component {
    constructor(props){

        super(props);
       
    }
    pushDB(){
    firebase.database().co('Users').push({
            Name: this.props.auth.displayName,
            PhotoUrl:  this.props.auth.photoURL,
        })
    }
    onchange(){
        this.pushDB();
    }
    render()
    {
        const a = this.props.auth.uid
        
        if(a != null)
        {
            
                return(

                    <div className = "container"  >
                        <Message />
                      
                    </div>
            )
        }
        else{
            return(

                <div className = "container"  >
                    <Welcome/>
                </div>
        )
        }
        

    }
    
}

const mapStateToProps = (state) => { 
    console.log(state);
    return { 
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps,null)(Dashboard)
//export default Dashboard;