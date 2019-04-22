
// React base dependencies
import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';


// Javascript Dependencies
import Swiper from "react-native-swiper"


// Local dependencies
import SplashScreen from "react-native-splash-screen";
import SplashScreenImage from "SpotmeDetached/assets/splash.png";

import {
    MISSION,
    WHO_ARE_WE,
    WHAT_WE_DELIVER
} from "SpotmeDetached/assets/IntroImages"

import {
    MAIN_COLORS
} from "SpotmeDetached/src/helpers"

class Login extends Component {
    constructor(props) {
        super(props);
        this.slides = [
            {
                text: "Our Mission is to make parking easier for everyone",
                image: MISSION

            },
            {
                text: "We Provide parking data to you to assist in finding parking",
                image: WHO_ARE_WE
            },
            {
                text: "Real Time Data, Streamed Straight to You",
                image: WHAT_WE_DELIVER
            }
        ]
    }

    componentDidMount = () => {
        SplashScreen.hide();
    }

    generateSlides = () => {
        return this.slides.map((value, index, array) => {
            return (
                <View
                    key={value.text}
                    style={styles.slides}
                >
                    <Image // Main Image
                        style={{
                            height: 300,
                            width: 300
                        }}
                        resizeMode="contain"
                        source={value.image}
                    />
                    <Text // Main Text
                        style={{
                            width: "80%",
                            fontFamily: "Alleyn",
                            color: "white",
                            fontSize: 30,
                            textAlign: "center"
                        }}
                    >
                        {value.text}
                    </Text>

                    {index == array.length - 1 && // Only shows on last slide
                        <View
                            style={{
                                width: "100%",
                                height: 100,
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                bottom: 50
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    borderRadius: 10,

                                    height: 50,
                                    width: "80%",

                                    padding: 5,

                                    backgroundColor: "hsl(221, 70%, 30%)",

                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                onPress = {() => {
                                    this.props.navigation.navigate("MainApp");
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Alleyn",
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                >
                                    Let's Park Together
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }

                </View>
            )
        })
    }

    render() {
        return (
            <Swiper
                showsButtons={false}
                loop={false}
            >
                {this.generateSlides()}
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    slides: {
        flex: 1,
        backgroundColor: MAIN_COLORS.BASE,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default Login;
