import {
    createSwitchNavigator,
    createAppContainer
} from "react-navigation"

import MainApp from "./screens/mainApp";
import LoginScreen from "./screens/loginScreen"

const switchNav = createSwitchNavigator({
    LoginScreen,
    MainApp
});

export default createAppContainer(switchNav);