import React, { Component } from "react";

import Welcome from "./Welcome";


class LoginScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Welcome
                navigation = {this.props.navigation} //Sends navigator down to 'Welcome' Component
            />
        )
    }
}

export default LoginScreen;