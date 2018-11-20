import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import styles from "./Styling.style.js";

export default class MenuScreen extends Component {
    render() {
        return (
            <View style={styles.menuScreen.containerStyle}>
                <Text>* This feature is under development * </Text>
                <Button
                onPress={() => this.props.navigation.openDrawer()}
                title="Back"
                />
            </View>
        );
    }
}
