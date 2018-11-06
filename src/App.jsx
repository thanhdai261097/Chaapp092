import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from "./Components/Layout/Navbar"
import Dashboard from './Components/Dashboard/Dashboard'
import Signin from './Components/Auth/Signin'
import Signup from './Components/Auth/Signup'

class App extends Component {
    render() {
        return (
            <BrowserRouter >
                <div className = "App">
                    <Navbar/>
                    <Switch>
                        <Route exact path = "/" component = {Dashboard}/>
                        <Route path = "/signin" component = {Signin}/>
                        <Route path = "/signup" component = {Signup}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;