import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import WelcomeScreen from './screens/Welcome';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import LogoTitle from './components/LogoTitle';
import Icon from 'react-native-vector-icons/Ionicons';
import FacebookAuth from './screens/FacebookAuth';

import Profile from './screens/Profile';
import Favorite from './screens/Favorite';
import History from './screens/History';
import MapApp from "./src/App";


const AppSwitchNavigator = createSwitchNavigator({
    AuthLoadingScreen: AuthLoadingScreen,
    App: MapApp,
    History: History,
    Welcome: WelcomeScreen,
    Signin: Signin,
    Signup: Signup,
})

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppSwitchNavigator />
            </Provider>
        );
    }
}

//remote the yellow // WARNING:
console.disableYellowBox = true;

export default App;

// export default createSwitchNavigator({
//   AuthLoadingScreen: AuthLoadingScreen,
//   Auth: AuthStackNavigator,
//   App: AppDrawerNavigator
// })

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //backgroundColor: '#fff',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });
