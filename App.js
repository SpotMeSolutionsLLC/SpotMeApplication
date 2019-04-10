import React from 'react';
import { 
    StatusBar,
    Image
} from "react-native";
import { Provider } from 'react-redux';
import store from './src/redux/index';
import MainApp from './src';
import OpenSans from "./assets/fonts/OpenSans.ttf";
import Alleyn from "spotmesolutions/assets/fonts/Alleyn.ttf"
import { AppLoading, Asset, Font, SplashScreen} from "expo";

class App extends React.Component {
    constructor(props){
        super(props);
        StatusBar.setHidden(true);
        this.state = {
            isReady: false,
        }
    }

    render() {
        return (this.state.isReady) ? (
            <Provider store={store}>
                <MainApp />
            </Provider>
        ) : (
            <AppLoading
                startAsync = {this._cacheResources}
                onFinish = {() => this.setState({ isReady: true })}
                onError = {console.warn}
                autoHideSplash = {false}
            />
        )
    }

    async _cacheResources(){
        const images = [
            require('./assets/images/what.png'),
            require('./assets/images/real_time.png'),
            require('./assets/images/mission.png'),
            require("./assets/images/SpotMe_Logo.png"),
            require("./assets/images/menu.png"),
            require("./assets/images/loading.gif"),
            require("./assets/splash.png"),
            require("./assets/images/refreshIcon.png")
        ]

        const cacheFont = Font.loadAsync({
            OpenSans: OpenSans,
            Alleyn: Alleyn
        })

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });

        let cacheAll = [];
        cacheAll.push(cacheFont);
        cacheAll.concat(cacheImages);
        

        return Promise.all(cacheAll);
    }
}

//remote the yellow // WARNING:

export default App;
