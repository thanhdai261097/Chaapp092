import React from 'react';
import { NavLink } from 'react-router-dom'


const SignoutLink = () => { 
    return (
        <ul className = "right">
            <li> <NavLink to = "/signin">Sign In</NavLink> </li>
            
        </ul>
    )
}

export default SignoutLink