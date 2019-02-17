import React from 'react';
import {
    AppRegistry
} from "react-native";
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './redux';
import WelcomeScreen from './welcomePage/Welcome';
// import Signup from './Welcome Page/Signup';
// import Signin from './Welcome Page/Signin';
// import History from './Welcome Page/History';
import MapApp from './src/App';

import { AppLoading, Asset, Font } from "expo";

AppRegistry.registerComponent("Spotme", () => MapApp);

//Used to switch between different screens
const AppSwitchNavigator = createSwitchNavigator({
    Welcome: WelcomeScreen,
    App: MapApp,
});

const AppContainer = createAppContainer(AppSwitchNavigator);


class App extends React.Component {

    constructor(props) {
        // AppRegistry.registerComponent("App", () => App)
        super(props);
        this.state = {
            isLoaded: false
        }
    }


    cacheImages(images) {
        return images.map(image => {
            if (typeof image === "string") {
                return Image.prefetch(image);
            }
            else {
                return Asset.fromModule(image).downloadAsync();
            }
        });
    }

    cacheRoutine = async () => {
        const imageAssets = this.cacheImages([
            require("./src/images/car.png"),
            require("./src/images/car_icon.png"),
            require("./src/images/banana.png"),
            require("./src/images/garage.png"),
            require("./src/images/spotmarker.png"),
            require("./src/images/menu.png"),
            require("./src/images/loading.gif")

        ]);

        console.log("Cache Routine Ran");
        await Promise.all([...imageAssets]);
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
                <AppContainer />
            </Provider>
        );
    }
}

//remote the yellow // WARNING:
console.disableYellowBox = true;

export default App;
