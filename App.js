import React from 'react';
import { StatusBar } from "react-native";
import { Provider } from 'react-redux';
import store from './src/redux/index';
import MainApp from './src';
import OpenSans from "./assets/fonts/OpenSans.ttf";
import { AppLoading, Asset, Font} from "expo";

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
            require("./assets/images/loading.gif")
        ]

        const cacheFont = Font.loadAsync({
            OpenSans: OpenSans
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
