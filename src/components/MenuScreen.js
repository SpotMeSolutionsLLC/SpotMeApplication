import React, {Component} from 'react';
import {Text, View, Button } from 'react-native';

export default class MenuScreen extends Component{
    render(){
        return (
            <View style = {styles.containerStyle}>
            <Text>* This feature is under development * </Text>
            <Button
            onPress={() => this.props.navigation.openDrawer()}
            title="Back"
            />
            </View>
        );
    }
}

const styles = {
    containerStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}