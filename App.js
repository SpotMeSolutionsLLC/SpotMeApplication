import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import WelcomeScreen from './screens/Welcome';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import History from './screens/History';
import MapApp from './src/App';

//Used to switch between different screens
const AppSwitchNavigator = createSwitchNavigator({
    AuthLoadingScreen,
    App: MapApp,
    History,
    Welcome: WelcomeScreen,
    Signin,
    Signup,
});

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
