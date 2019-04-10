import React, { Component } from 'react';
import { Image, View, Text, SafeAreaView, Animated, Dimensions } from 'react-native';
import {
    SplashScreen
} from "expo"

import { Button } from 'native-base';
import Slides from './Slides';

import SplashScreenImage from "spotmesolutions/assets/splash.png"


const SLIDE_DATA = [
    {
        text: 'What is SpotMe',
        subText: 'a parking app that tells you where parking is available in real-time',
        image: require('spotmesolutions/assets/images/what.png'),
        color: '#EAF3FE'
    },
    {
        text: 'How it works',
        subText: 'sensors in garages count traffic flow and stream live data to the app',
        image: require('spotmesolutions/assets/images/real_time.png'),
        color: '#EAF3FE'
    },
    {
        text: 'Our mission',
        subText: 'making parking easier for everyone',
        image: require('spotmesolutions/assets/images/mission.png'),
        color: '#EAF3FE'
    }
];

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);

        this.animations = {
            splashPos: new Animated.Value(0)
        }
    }

    render() {
        return (
            <>
                <SafeAreaView
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#EAF3FE',
                    }}
                >
                    <Animated.View
                        style={{
                            flex: 1,
                            width: Dimensions.get("window").width,
                            height: Dimensions.get("window").height,
                            position: "absolute",
                            zIndex: 99,
                            transform: [
                                {
                                    translateY: this.animations.splashPos
                                }
                            ],
                            borderRadius: 20,
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={SplashScreenImage}
                            fadeDuration={0}
                            onLoadEnd={() => {
                                console.log("onLoadEnd")
                                SplashScreen.hide();
                                Animated.timing(this.animations.splashPos, {
                                    toValue: -Dimensions.get("window").height,
                                    duration: 1000,
                                    useNativeDriver: true
                                }).start();
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                        <View
                            style={{
                                height: 400,
                                width: Dimensions.get("window").width,
                                // backgroundColor: "red",
                                alignItems: "center",
                                position: "relative",
                                overflow: "hidden",
                                top: -200
                            }}
                        >
                            <View
                                style={{
                                    height: Dimensions.get("window").width * 2,
                                    width: Dimensions.get("window").width * 2,
                                    backgroundColor: "#054CE4",
                                    borderBottomLeftRadius: Dimensions.get("window").width * 2,
                                    borderBottomRightRadius: Dimensions.get("window").width * 2,
                                    position: "absolute",
                                    bottom: 0
                                }}
                            />
                            <Text
                                style={{
                                    fontFamily: "Alleyn",
                                    fontSize: 40,
                                    color: "white",
                                    position: "absolute",
                                    bottom: 70,
                                    width: "80%",
                                    textAlign: "center"
                                }}
                            >
                                Let's park Together
                            </Text>
                        </View>
                    </Animated.View>

                    <View
                        style = {{
                            height: 200,
                            width: "100%"
                        }}
                    />

                    <Slides
                        data={SLIDE_DATA}
                    />

                    <View
                        style={{
                            alignSelf: 'stretch',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            margin: 30,
                        }}
                    >

                        <Button
                            onPress={() => {
                                this.props.navigation.navigate('MainApp')
                            }}
                            bordered
                            dark
                            style={{
                                width: 240,
                                justifyContent: 'center',
                                backgroundColor: "#054CE4"
                            }}
                        >
                            <Text
                                style = {{
                                    fontFamily: "Alleyn",
                                    fontSize: 20,
                                    color: "white"
                                }}
                            >
                                Continue
                            </Text>
                        </Button>

                    </View>

                </SafeAreaView>
            </>
        )
    }
}

export default WelcomeScreen;
