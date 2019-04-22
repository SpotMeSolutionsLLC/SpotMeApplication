// React Base dependencies
import React from "react";

// Native dependencies
import AsyncStorage from "@react-native-community/async-storage"

// React navigation dependencies
import {
    createSwitchNavigator,
    createAppContainer
} from "react-navigation"

// Local dependencies
import MainApp from "./screens/mainApp";
import LoginScreen from "./screens/loginScreen";

class RootNavigatorRouter extends React.Component{
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        console.log("Bootstrap called");
        const token = await AsyncStorage.getItem("hasLoggedIn");
        if(token != "true"){
            console.log("LoginScreen");
            await AsyncStorage.setItem("hasLoggedIn","true")
            
            this.props.navigation.navigate("LoginScreen")
        }
        else{
            console.log("MainApp");
            this.props.navigation.navigate("MainApp");
        }
    }

    render(){
        return (
            <>
            </>
        );
    }
}

const switchNav = createSwitchNavigator({
    RootNavigatorRouter: RootNavigatorRouter,
    LoginScreen,
    MainApp
});

export default createAppContainer(switchNav);