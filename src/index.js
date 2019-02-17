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

const RootNavigatorContainer = createAppContainer(RootNavigator)

class App extends Component {

    render() {
        return(
            <RootNavigatorContainer />
        )
                
    }
}
export default App;
