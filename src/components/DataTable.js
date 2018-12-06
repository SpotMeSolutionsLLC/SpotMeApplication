import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Animated
} from "react-native";

import styles from "./Styling.style.js"

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
            <Animated.View style={[{
                top: this.state.top,
                
            },styles.dataTable.box]}>
                <Text>asdf</Text>
            </Animated.View>
        );
    }

}



export default DataTable;