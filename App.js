import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/index';
import MainApp from './src';
import OpenSans from "./assets/fonts/OpenSans.ttf";
import Alleyn from "spotmesolutions/assets/fonts/Alleyn.ttf";
import { Asset, Font, AppLoading } from "expo";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        }
    }

    render() {

        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResources}
                    onFinish={() => {
                        console.log("Apploading completed");
                        this.setState({
                            isReady: true
                        })
                    }}
                    onError={console.warn}
                    autoHideSplash={false}
                />
            )
        }
        else {
            console.log("asdf");
            return (
                <Provider store={store}>
                    <MainApp />
                </Provider >
            )
        }
    }

    _cacheResources = async () => {
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
            OpenSans,
            "alleynFont": Alleyn
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

export default App;
