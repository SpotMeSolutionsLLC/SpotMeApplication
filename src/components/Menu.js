import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';

import styles from "./Styling.style.js";

export default class MenuScreen extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image source={require("../images/profile1.png")} />
        )
      }

    render() {
        return (
            <View style={styles.menu.containerStyle}>
                <Text>* Account Information* </Text>
                <Button
                //onPress={() => this.props.navigation.navigate('DrawerOpen')}
                onPress={() => this.props.navigation.openDrawer()}
                title="Back"
                />
            </View>
        );
    }
}

