import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, ActivityIndicator } from 'react-native';

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this.loadApp();
  }

  loadApp = async() => {
    //This checks if the user previously logged in, if so it skips the authentication screen
    const userToken = await AsyncStorage.getItem('fb_token'); 
    this.props.navigation.navigate(userToken ? 'App' : 'Welcome');
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AuthLoadingScreen;
