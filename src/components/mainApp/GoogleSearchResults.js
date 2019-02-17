import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';

import axios from 'axios';

import styleSheet from './Styling.style';

import { connect } from "react-redux"

import { changeLocation } from "../../redux/actions/LocationAction"
import { setSearchIsFocused } from "../../redux/actions/searchActions"



const styles = styleSheet.googleSearchResults;

const windowWidth = Dimensions.get('window').width;

//Google places autocomplete, used for searching up locations
class GoogleSearchResults extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            style: {
                opacity: 0.5
            },
            displayScroll: false,
            data: [],
            currentLocation: {
                lat: 0,
                lng: 0
            }
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

    //Displays scroll view data 
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
                        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                            params: {
                                key: 'AIzaSyAknyin7pzbkZ89IRg6QeQ0gC2sVjSKRpY',
                                place_id: dataInstance.place_id
                            }
                        }).then((geoCode) => {
                            this.props.changeLocation({
                                latitude: geoCode.data.results[0].geometry.location.lat,
                                longitude: geoCode.data.results[0].geometry.location.lng
                            })
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
        this.refs.textInput.clear();
        this.props.setFocus(false);
        this.setState({
            displayScroll: false,
            style: {
                opacity: 0.5
            }

        });
    }

    onFocus = () => {
        this.props.setFocus(true);
        PubSub.publish("slideDown");
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

    onChangeText =  (newText) => {
        // const currentLoc = await this.state.ref.getLocationAsync();
        axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
            params: {
                key: 'AIzaSyAknyin7pzbkZ89IRg6QeQ0gC2sVjSKRpY',
                input: newText,
                offset: 3,
                types: "geocode",
                // location: currentLoc.coords.latitude + "," + currentLoc.coords.longitude
            }
        }).then((placesAutocomplete) => {
            this.setState({
                data: placesAutocomplete.data.predictions
            });
        });
    }

    //Renders search bar components, 
    //such as the drop down list when typing in a location
    render() {
        return (
            <>
                <Animated.View
                    style={[styles.inputContainer, {
                        top: this.animations.inputTop,
                        width: this.animations.inputWidth
                    }]}
                >
                    <TextInput
                        ref='textInput'
                        placeholder='Search a location or garage!'
                        style={[styles.input, {
                            opacity: this.state.style.opacity,
                        }]}
                        underlineColorAndroid='white'
                        // onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                    />
                    {this.getScrollView()}
                </Animated.View>

            </>
        );
    }

    componentWillReceiveProps(newProps){
        (newProps.isFocused) ? this.onFocus() : this.onBlur();
    }

}

const mapStateToProps = (state) => {
    return {
        isFocused: state.searchBar.isFocused
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        changeLocation: (coordinates) => {
            dispatch(changeLocation(coordinates))
        },
        setFocus: (isFocused) => {
            dispatch(setSearchIsFocused(isFocused));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(GoogleSearchResults);
