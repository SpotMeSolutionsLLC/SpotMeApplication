//import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage, SafeAreaView , Button} from 'react-native';
//import { AppLoading } from 'expo';
//import Slides from '../components/Slides';
import styles from "../src/components/Styling.style"

class Signup extends Component {
    // static navigationOptions = {
    //   header: null
    // };
    render() {
        return (
            <SafeAreaView
                style={styles.safeAreaViewAndroid}
            >
                <Text>SIGNUP!</Text>
                <Button
                    title={"Go Back"}
                    onPress={(e) => {
                        this.props.navigation.navigate("Welcome")
                    }}
                >

                </Button>
            </SafeAreaView>
        )
    }
}

export default Signup;