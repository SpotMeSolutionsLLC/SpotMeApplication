import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Dimensions,
    Animated,
    Image,
    Platform
} from 'react-native';
import axios from 'axios';

import { 
    slideUp,
    sendKey,
    slideDown
} from "../actions/slideActions"

import { connect } from "react-redux";

import PerGarageInfo from './PerGarageInfo';
import loadingImage from "../images/loading.gif";

import styles from "./Styling.style.js";

import PubSub from "pubsub-js";


class GarList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parkingsName: '',
            parkingsMax: 0,
            parkingsCurrent: 0,
            status: 0, //0 = not loaded, 1 = loading, 2 = loaded
            bottom: new Animated.Value(-(styles.garList.containerStyle.height)),
        };
        this.slideUp = this.slideUp.bind(this);
        this.slideDown = this.slideDown.bind(this);
        PubSub.subscribe("slideUp", this.slideUp);
        PubSub.subscribe("slideDown", this.slideDown);
        PubSub.subscribe("updateData", this.updateData);
    }

    updateData = (context, searchName) => {
        console.log("Currently fetching data: " + searchName.key);
        this.setState({
            status: 1
        }, () => {
            axios.post('https://project-one-203604.appspot.com/garages/garage', {
                name: searchName.key
            }).then(res => {

                console.log('Found Garage Data: ' + searchName.key);


                this.setState({
                    parkingsName: res.data.name,
                    parkingsMax: res.data.max,
                    parkingsCurrent: res.data.current,
                    status: 2
                }, function () {
                    console.log("State has changed");
                });

            });
        });

    }

    whenDoneLoading() {
        console.log("WhenDoneLoading");
        if (this.state.status == 2) {
            console.log("PerGarageInfo Loaded, Status: " + this.state.status);
            return (
                <PerGarageInfo
                    spotsNum={this.state.parkingsCurrent}
                    garageName={this.state.parkingsName}
                    garageMax={this.state.parkingsMax}
                />
            );
        }
        else {
            return (
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: styles.garList.height
                }}>
                    <Image style={{
                        width: 50,
                        height: 50
                    }}
                        source={loadingImage} />
                </View>
            )
        }

    }

    slideUp() {
        if (Platform.OS == "android") {
            Animated.timing(this.state.bottom, {
                toValue: -(styles.garList.containerStyle.height - styles.garList.height),
                duration: 100
            }).start();
        }
        else {
            this.setState({
                bottom: -(styles.garList.containerStyle.height - styles.garList.height)
            });
        }

    }

    slideDown() {
        if (Platform.OS == "android") {
            Animated.timing(this.state.bottom, {
                toValue: -(styles.garList.containerStyle.height),
                duration: 100
            }).start();
            this.setState({
                status: 0
            });
        }
        else {
            this.setState({
                status: 0,
                bottom: -(styles.garList.containerStyle.height),
            });
        }
    }


    render() {
        return (
            <Animated.View style={[styles.garList.containerStyle, { bottom: this.state.bottom }]}>
                <View style={styles.garList.garageStyle}>
                    {this.whenDoneLoading()}


                </View>
            </Animated.View>
        )

    }
}

export default GarList;

