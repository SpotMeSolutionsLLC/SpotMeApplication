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

export default createAppContainer(RootNavigator);
