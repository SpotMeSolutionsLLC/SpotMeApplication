import React, { Component } from 'react';
import { Image, View, Text, SafeAreaView } from 'react-native';
import { Button } from 'native-base';
import Slides from './Slides';


const SLIDE_DATA = [
    {
        text: 'What is SpotMe',
        subText: 'A parking app that tells you where parking is available in real-time',
        image: require('./images/what.png'),
        color: '#EAF3FE'
    },
    {
        text: 'How it Works',
        subText: 'Sensors in garages count traffic flow and stream live data to the app',
        image: require('./images/real_time.png'),
        color: '#EAF3FE'
    },
    {
        text: 'Our Mission',
        subText: 'Making parking easier for everyone',
        image: require('./images/mission.png'),
        color: '#EAF3FE'
    }
];

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#EAF3FE',
                }}
            >

                <Image
                    source={
                        require('./images/SpotMe_Logo.png')
                    }
                    style={{
                        width: 201,
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 75,
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
                            width: 120,
                            justifyContent: 'center'
                        }}
                    >
                        <Text>Sign In</Text>
                    </Button>

                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('Signup')
                        }}
                        style={{
                            width: 120,
                            justifyContent: 'center',
                            backgroundColor: '#1AE6CB',
                        }}
                    >
                        <Text
                            style={{ color: 'white' }}
                        >
                            Get Started
                        </Text>
                    </Button>

                </View>

            </SafeAreaView>
        )
    }
}

export default WelcomeScreen;
