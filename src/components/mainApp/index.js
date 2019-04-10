import React, { Component } from 'react'
import {
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";

import MapScreen from "./MapScreen"


const MainAppNavigator = createSwitchNavigator({
    Map: MapScreen,
});



export default createAppContainer(MainAppNavigator);