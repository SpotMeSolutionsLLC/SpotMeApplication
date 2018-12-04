import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Animated,
    Dimensions
} from "react-native";

import axios from "axios";

import styleSheet from "./Styling.style";

const styles = styleSheet.googleSearchResults;

const windowWidth = Dimensions.get("window").width
class GoogleSearchResults extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            style: {
                opacity: 0.5
            },
            displayScroll: false,
            data: [],
        }
        this.animations = {
            inputTop: new Animated.Value(30),
            inputWidth: new Animated.Value(windowWidth * 0.7),
        }

    }


    getScrollView() {

        if (this.state.displayScroll) {
            return (
                <ScrollView
                    style={styles.scroll}
                >
                    {this.getScrollViewData()}
                </ScrollView>
            )
        }
    }

    getScrollViewData() {
        return this.state.data.map(dataInstance => (
            <View
                style={styles.listView}
                key={dataInstance.place_id}

            >
                <Text
                    style={styles.listViewText}
                    onPress={() => {
                        this.onBlur();
                        this.refs.textInput.clear();
                        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
                            params: {
                                key: "AIzaSyAknyin7pzbkZ89IRg6QeQ0gC2sVjSKRpY",
                                place_id: dataInstance.place_id
                            }
                        }).then((geoCode) => {
                            console.log(geoCode.data.results[0].geometry.location);
                            this.props.onPress(geoCode.data.results[0].geometry.location);
                        })
                    }}

                >
                    {dataInstance.description}
                </Text>
            </View>
        ));
    }

    onBlur = () => {
        Animated.parallel([
            Animated.timing(this.animations.inputTop, {
                toValue: 30,
                duration: 100
            }),
            Animated.timing(this.animations.inputWidth, {
                toValue: windowWidth * 0.7,
                duration: 100
            })
        ]).start();
        this.refs.textInput.blur();
        this.setState({
            displayScroll: false,
            style: {
                opacity: 0.5
            }

        });
    }

    onFocus = () => {
        Animated.parallel([
            Animated.timing(this.animations.inputTop, {
                toValue: 0,
                duration: 100
            }),
            Animated.timing(this.animations.inputWidth, {
                toValue: windowWidth,
                duration: 100
            })
        ]).start();
        this.setState({
            displayScroll: true,
            style: {
                opacity: 1
            }
        });
    }

    onChangeText = (newText) => {
        axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
            params: {
                key: "AIzaSyAknyin7pzbkZ89IRg6QeQ0gC2sVjSKRpY",
                input: newText,
                offset: 3,
                types: "geocode"
            }
        }).then((placesAutocomplete) => {
            console.log(placesAutocomplete.data);
            this.setState({
                data: placesAutocomplete.data.predictions
            });
        })
    }


    render() {
        return (
            <React.Fragment>
                <Animated.View
                    style={[styles.inputContainer, {
                        top: this.animations.inputTop,
                        width: this.animations.inputWidth
                    }]}
                >
                    <TextInput
                        ref="textInput"
                        placeholder="Search a location or garage!"
                        style={[styles.input, {
                            opacity: this.state.style.opacity,
                        }]}
                        underlineColorAndroid="white"
                        // onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                    >

                    </TextInput>
                    {this.getScrollView()}
                </Animated.View>

            </React.Fragment>
        )
    }
}



export default GoogleSearchResults;