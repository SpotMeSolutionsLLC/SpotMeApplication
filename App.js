// React dependencies
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

// Native modules
import { Asset } from "expo-asset";
import * as Font from 'expo-font';
import SplashScreen from 'react-native-splash-screen';

// JS modules
import {
    Provider
} from "react-redux"
import reduxStore from "./src/redux"

// Imported local components
import RootNavigator from "./src/index.js";

// Imported assets
import Splash from "SpotmeDetached/assets/splash.png";
import Alleyn from "SpotmeDetached/assets/fonts/Alleyn.ttf";

StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isReady: false
        }
    }

    loadAssets = async () => {
        const images = [
            Splash
        ];
        
        const cacheFonts = Font.loadAsync({
            Alleyn: Alleyn
        })

        const cacheImages = images.map(image => {
            return Asset.fromModule(image).downloadAsync();
        });

        let cacheAll = [];

        cacheAll.concat(cacheImages);
        cacheAll.push(cacheFonts);


        return Promise.all(cacheAll);
    }

    componentDidMount = async () => {
        await this.loadAssets();
        this.setState({
            isReady: true
        }, () => {
            SplashScreen.hide();
        });
    }

    render() {
        return (this.state.isReady) ? (
            <Provider
                store = {reduxStore}
            >
                <RootNavigator/>
            </Provider>
        ) : (
            <>
            </>
        )
    }
}

export default App;