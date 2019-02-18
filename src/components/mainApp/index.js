import React, { Component } from 'react'
import {
    createDrawerNavigator,
    createAppContainer
} from "react-navigation";

import MapScreen from "./MapScreen"
import Favorite from "./Favorite"
import App from "../../index";


const MainAppNavigator = createDrawerNavigator({
    Map: MapScreen,
    Favorite: Favorite,
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