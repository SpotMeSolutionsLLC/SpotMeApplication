import LoginScreen from "./components/loginScreen";
import MainApp from "./components/mainApp/index.js";

import {
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";

const RootNavigator = createSwitchNavigator({
    LoginScreen: LoginScreen,
    MainApp: MainApp
})

export default createAppContainer(RootNavigator);
