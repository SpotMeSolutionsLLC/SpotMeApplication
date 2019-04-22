// React dependencies
import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';

// Native modules
import { Asset } from "expo-asset";
import * as Font from 'expo-font';
import AsyncStorage from "@react-native-community/async-storage";

// JS modules
import {
    Provider
} from "react-redux"
import reduxStore from "./src/redux"

// Imported local components
import RootNavigator from "./src/index.js";

// Imported assets
import {
    MISSION,
    WHO_ARE_WE,
    WHAT_WE_DELIVER
} from "SpotmeDetached/assets/IntroImages";
import Splash from "SpotmeDetached/assets/splash.png";

import Alleyn from "SpotmeDetached/assets/fonts/Alleyn.ttf";
import Alleyn_Light from "SpotmeDetached/assets/fonts/Alleyn_Light.ttf"

StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        }
    }

    test = async () => {
        await AsyncStorage.clear();
    }

    loadAssets = async () => {
        const images = [
            Splash,
            MISSION,
            WHO_ARE_WE,
            WHAT_WE_DELIVER
        ];

        const cacheFonts = Font.loadAsync({
            Alleyn: Alleyn,
            Alleyn_Light: Alleyn_Light
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
            isReady: true,
        });
    }

    render() {
        return (this.state.isReady) ? (
            <Provider
                store={reduxStore}
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