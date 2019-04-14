import React, { Component } from 'react';
import { Image, View, Text, Animated, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import { SafeAreaView } from "react-navigation"
import {
    SplashScreen
} from "expo"

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
        console.log("Welcome loaded");
        this.animations = {
            splashPos: new Animated.Value(0),
        }
        
        this.state = {
            firstTime: true,
        }
    }

    componentDidMount = async () => {
        let key;
        try{
            key = await AsyncStorage.getItem("FirstTime");
            if(key == "false"){
                this.setState({
                    firstTime: false
                })
            }else {
                await AsyncStorage.setItem("FirstTime", "false")
            }
            
        }
        catch(error){
        }
        finally{
            console.log(this.state.firstTime);
        }
    }

    render() {
        return (
            <>
                <SafeAreaView
                    style={{
                        
                        height: "100%",
                        width: "100%",
                        paddingTop: 200,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#EAF3FE',
                        position: "relative"
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
                                height: 200,
                                width: Dimensions.get("window").width,
                                // backgroundColor: "red",
                                alignItems: "center",
                                position: "relative",
                                overflow: "hidden",
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
                                    fontFamily: "alleynFont",
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

                    <Slides
                        data={SLIDE_DATA}
                    />

                    <View
                        style={{
                            width: "100%",
                            flexDirection: 'row',
                            padding: 40,
                            height: 80,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >

                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('MainApp')
                            }}
                            style={{
                                width: 240,
                                height: 40,
                                justifyContent: 'center',
                                backgroundColor: "#054CE4",
                                alignItems: "center",
                                borderRadius: 10
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "alleynFont",
                                    fontSize: 20,
                                    color: "white"
                                }}
                            >
                                Continue
                            </Text>
                        </TouchableOpacity>

                    </View>

                </SafeAreaView>
            </>
        )
    }
}

export default WelcomeScreen;
