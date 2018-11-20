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

import { PerGarageInfo } from './PerGarageInfo';
import loadingImage from "../images/loading.gif";

import styles from "./Styling.style.js";


class GarList extends Component {
    state = {
        parkingsName: '',
        parkingsMax: 0,
        parkingsCurrent: 0,
        loaded: false,
        bottom: new Animated.Value(-styles.garList.containerStyle.height)

    };

    constructor(props) {
        super(props);
        console.log(this.state.bottom);

        this.slideUp = this.slideUp.bind(this);
        this.slideDown = this.slideDown.bind(this);
    }


    // componentDidMount() {
    //     this.updateData("SJNorth");
    //     // this.setState({
    //     //     parkingsName: "SJNorth",
    //     //     parkingsMax: 730,
    //     //     parkingsCurrent: 300,
    //     //     loaded:true
    //     // });

    // }

    updateData(searchName) {
        console.log("Currently fetching data");
        axios.post('https://project-one-203604.appspot.com/garages/garage', {
            name: searchName
        }).then(res => {

            console.log('Found Garage Data: ' + searchName);



            this.setState({
                parkingsName: res.data.name,
                parkingsMax: res.data.max,
                parkingsCurrent: res.data.current,
                loaded: true
            }, function () {
                console.log("State has changed");
            });

        });
    }

    whenDoneLoading() {
        console.log("WhenDoneLoading");
        if (this.state.loaded) {
            console.log("PerGarageInfo Loaded");
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

    slideUp(searchName){
        console.log("slideUp called");
        this.updateData(searchName);
        if(Platform.OS == "android"){
                Animated.timing(this.state.bottom,{
                toValue: -(styles.garList.containerStyle.height - styles.garList.height),
                duration: 100
            }).start();
            this.state.loaded = true;
        }
        else{
            this.setState({
                loaded: true,
                bottom: -(styles.garList.containerStyle.height - styles.garList.height)
            });
        }
            
    }

    slideDown(){
        console.log("slideDown Called");
        if(this.state.loaded == true){
            if(Platform.OS == "android"){
                Animated.timing(this.state.bottom,{
                    toValue: -(styles.garList.containerStyle.height),
                    duration: 100
                }).start();
                this.state.loaded = false;
            }
            else{
                this.setState({
                    bottom: -(styles.garList.containerStyle.height),
                    loaded: false
                });
            }
        }
    }


    render() {
        let { bottom } = this.state;
        return (
            <Animated.View style={[styles.garList.containerStyle, { bottom: bottom }]}>
                <View style={styles.garList.garageStyle}>
                    {this.whenDoneLoading()}

                </View>
            </Animated.View>
        )

    }
}



export default GarList;

