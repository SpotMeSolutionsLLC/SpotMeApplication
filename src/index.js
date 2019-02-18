import React, { Component } from 'react';

import LoginScreen from "./components/loginScreen";
import MainApp from "./components/mainApp";

import {
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";

const RootNavigator = createSwitchNavigator({
    LoginScreen: LoginScreen,
    MainApp: MainApp
})

export const RootNavigatorContainer = createAppContainer(RootNavigator)

class Root extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <RootNavigatorContainer />
        )
                
    }
}
export default Root;
