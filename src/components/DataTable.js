import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Animated
} from "react-native";


class DataTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            top: new Animated.Value(100)
        }
    }

    startAnimation(){
        console.log("startAnimation Called");
        Animated.timing(this.state.top,{
            toValue: 200
        }).start();
    }

    render(){
        return(
            <Animated.View style={{
                top: this.state.top,
                position:"absolute",
                height: 100,
                width: 100
            }}>
                <Text>asdf</Text>
            </Animated.View>
        );
    }

}




let styles = {
    box:{
        position:"absolute",
        height: 100,
        width: 100
    }
};

export default DataTable;