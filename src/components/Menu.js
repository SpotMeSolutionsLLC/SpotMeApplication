import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';

export default class MenuScreen extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image source={require("../images/profile1.png")} />
        )
      }

    render() {
        return (
            <View style={styles.containerStyle}>
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

const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};
