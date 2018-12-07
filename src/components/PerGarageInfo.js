import React from 'react';
import { View, Text, Image } from 'react-native';
// import { colors } from 'react-native-elements';

import styles from "./Styling.style.js";

import { connect } from "react-redux";

import {
    getMarkerColor
} from "../actions/speechActions";

import { Speech } from "expo";

import PubSub from "pubsub-js";

class PerGarageInfo extends React.Component {
    constructor(props) {
        super(props);
        this.getColor = this.getColor.bind(this);
        PubSub.subscribe("getColor", this.getColor);
    }


    getColor(percentage) {
        let toReturn = "";
        if (percentage < 25) {
            toReturn = "green";
        }
        else if (percentage < 50) {
            toReturn = "yellow";
        }
        else if (percentage < 75) {
            toReturn = "orange";
        }
        else {
            toReturn = "red";
        }
        Speech.speak("The Current Color is " + toReturn);
        return toReturn;
    }

    render() {
        return (
            <View style={styles.perGarageInfo.containerStyle}>

                <View style={styles.perGarageInfo.leftSectionStyle}>
                    <View style={styles.perGarageInfo.generalStyle}>
                        <Text style={{ fontSize: 40, color: 'blue' }}>
                            {this.props.garageName}
                        </Text>
                    </View>

                    <Text style={{ fontSize: 23, color: 'white' }}>
                        {
                            this.props.spotsNum + " / " + this.props.garageMax}
                    </Text>
                </View>

                <View style={[styles.perGarageInfo.rightSectionStyle, {
                    justifyContent: "center",
                    alignItems: "center",
                }]}>



                    <View style={[styles.perGarageInfo.generalStyle, {
                        alignItems: "center",

                    }]}>
                        <Text
                            style={[styles.perGarageInfo.textStyle, {
                                backgroundColor: this.getColor(this.props.spotsNum / this.props.garageMax * 100)
                            }]}
                            ref = {() => {
                                console.log("PerGarageInfo rendered");
                            }}
                        >
                            {Math.floor((this.props.spotsNum / this.props.garageMax * 100))}%
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        
    }
}


export default connect(null, mapDispatchToProps)(PerGarageInfo);
