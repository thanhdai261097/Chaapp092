import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from "./Components/Layout/Navbar"
import ChatFrame from './Components/Chatting/ChatFrame'

import Signin from './Components/Auth/Signin'




class App extends Component {
    
  
    render() {
        return (
            <BrowserRouter >
                <div className = "App">
                    <Navbar/>
                    <Switch>        
                        <Route exact path = "/" component = {ChatFrame}/>
                        <Route path = "/chat/:id" component = {ChatFrame}/>
                        <Route path = "/signin" component = {Signin}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;