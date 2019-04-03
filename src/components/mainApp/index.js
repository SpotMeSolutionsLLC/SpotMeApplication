import React, { Component } from 'react'
import {
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";

import MapScreen from "./MapScreen"


const MainAppNavigator = createSwitchNavigator({
    Map: MapScreen,
});



const MainAppNavigatorContainer = createAppContainer(MainAppNavigator);

class MainApp extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <MainAppNavigatorContainer/>
        )
    }
}

export default MainApp;