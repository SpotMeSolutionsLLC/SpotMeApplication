//import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Button, Icon } from 'native-base';
//import { AppLoading } from 'expo';
//import Slides from '../components/Slides';

class Signin extends Component {

  // signIn = async () => {
  //   await AsyncStorage.setItem('userToken', 'Colin')
  //   // this.props.navigation.navigate('App')
  //   this.props.navigation.navigate('FacebookLogin')
  // }
  signIn = () => {
    this.props.navigation.navigate('App')
  }

  render() {
    return (
    <View style={styles.BtnContainer}>
        <Button
          primary
          style={styles.FbBtn}
          onPress={this.signIn}
        >
          <Icon name="logo-facebook" />
          <Text style={styles.TxtContainer}>
            Continue with Facebook
          </Text>
        </Button>
        {/* <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button> */}
    </View>
    )
  }
}

export default Signin;

const styles = StyleSheet.create({
  BtnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FbBtn: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 50
  },
  TxtContainer: {
    color: 'white'
  }
});
