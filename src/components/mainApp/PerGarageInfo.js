import React from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { showLocation } from 'react-native-map-link'
// import { colors } from 'react-native-elements';


import styles from "./Styling.style.js";

import { connect } from "react-redux";

import { Speech } from "expo";

import PubSub from "pubsub-js";

//The table for a garage, displays information on garage
class PerGarageInfo extends React.Component {
    constructor(props) {
        super(props);
        this.getColor = this.getColor.bind(this);
        PubSub.subscribe("getColor", this.getColor);
    }


    //Determines color of a garage
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

    //Renders table/chart containing information on a marker
    render() {
        return (
            <View style={styles.perGarageInfo.containerStyle}>

                <View style={styles.perGarageInfo.leftSectionStyle}>
                    <View style={styles.perGarageInfo.generalStyle}>
                        <Button 
                            style={styles.perGarageInfo.favoButton}
                            title={'Favorite this Garage'}
                            color={'purple'}
                            onPress={() => {
                                Alert.alert('This feature is under development.');
                            }}
                        />
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
                            ref={() => {
                                console.log("PerGarageInfo rendered");
                            }}
                        >
                            {Math.floor((this.props.spotsNum / this.props.garageMax * 100))}%
                        </Text>
                    </View>
                    <Button onPress={() => {
                        showLocation({
                            latitude: 37.339169,
                            longitude: -121.880684,
                            sourceLatitude: -8.0870631,  // optionally specify starting location for directions
                            sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
                            //   title: this.props.garageName,  // optional
                            //googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
                            googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
                            dialogTitle: 'Opening in Maps', // optional (default: 'Open in Maps')
                            dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
                            cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
                            appsWhiteList: ['apple-maps', 'google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
                            app: 'google-maps'  // optionally specify specific app to use
                        })

                    }}
                        style={styles.perGarageInfo.button}
                        title="Start Navigation"
                        color="blue"
                    />
                </View>
            </View>
        )
    }
}

//Able to dispatch colors to props, enables access of garage colors
const mapDispatchToProps = (dispatch) => {
    return {


    }
}


export default connect(null, mapDispatchToProps)(PerGarageInfo);
