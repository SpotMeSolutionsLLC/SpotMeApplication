import React from 'react';
import {
    AppRegistry
} from "react-native";
import { createSwitchNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import store from './redux';
import WelcomeScreen from './welcomePage/Welcome';
// import Signup from './Welcome Page/Signup';
// import Signin from './Welcome Page/Signin';
// import History from './Welcome Page/History';
import MapApp from './mainApp/App';

import { AppLoading, Asset, Font } from "expo";

import { getCurrentLocation } from "./mainApp/actions/LocationAction";

//Used to switch between different screens
const AppSwitchNavigator = createSwitchNavigator({
    Welcome: WelcomeScreen,
    App: MapApp,
    // History,
    // Signin,
    // Signup,
});

cacheImages = (images) => {
    return images.map((image) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        }
        else {
            console.log("image cached");
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

class App extends React.Component {

    constructor(props) {
        // AppRegistry.registerComponent("App", () => App)
        super(props);
        this.state = {
            isLoaded: false
        }
        getCurrentLocation();
    }


    

    cacheRoutine = async () => {
        const imageAssets = cacheImages([
            require("./mainApp/images/car.png"),
            require("./mainApp/images/car_icon.png"),
            require("./mainApp/images/banana.png"),
            require("./mainApp/images/garage.png"),
            require("./mainApp/images/spotmarker.png"),
            require("./mainApp/images/menu.png"),
            require("./mainApp/images/loading.gif")

        ]);

        imageAssets[0].then((result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        });

        console.log("Cache Routine Ran");

        
        
        await Promise.all(...imageAssets);
    }
    render() {
        if (!this.state.isLoaded) {
            return (
                <Expo.AppLoading
                    startAsync={this.cacheRoutine}
                    onFinish={() => {
                        this.setState({
                            isLoaded: true
                        })
                    }}
                    onError={(error) => {
                        console.warn(error);
                    }}
                />
            );
        }
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
