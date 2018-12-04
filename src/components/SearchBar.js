import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image,
    Platform,
    Animated
} from 'react-native';

import {
    focusClick,
    blurClick,
    sendLocData
} from "../actions/searchActions"

import { connect } from "react-redux";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styles from "./Styling.style";


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0.5,
            width: Dimensions.get("window").width * .8,
        }
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onFocus() {
        // console.log("focused");
        this.setState({
            opacity: 1
        });
    }

    onBlur() {
        // console.log("blurred");
        this.setState({
            opacity: 0.5
        })
    }

    onResultPress = (data, details = null) => {
        // console.log("onPress");
        
        this.props.sendLocation(details.geometry.location.lat, details.geometry.location.lng);
    }

    componentDidUpdate(){
        // console.log("SearchBar Updated");
        if(this.props.focused){
            this.onFocus();
            this.props.focus(false);
        }
        if(this.props.blurred){
            this.refs.googleRef.triggerBlur();
            this.onBlur();
            this.props.blur(false);
        }
    }

    render() {
        return (
            <GooglePlacesAutocomplete
                ref = "googleRef"
                placeholder='Search a location or garage!'
                minLength={2} //Minimum length of text entered for autocomplete results
                autoFocus={false}
                listViewDisplayed='false'
                returnKeyType={'default'}
                fetchDetails
                renderDescription={row => row.description}
                onPress={this.onResultPress}
                getDefaultValue={() => ''}
                query={{ key: 'AIzaSyAknyin7pzbkZ89IRg6QeQ0gC2sVjSKRpY' }}
                textInputProps={{
                    onFocus: () => {
                        this.onFocus()
                    },
                    onBlur: () => {
                        this.onBlur()
                    },
                }}
                styles={{
                    container: {

                    },
                    textInputContainer: {
                        top: 30,
                        height: 50,
                        width: "70%",
                        // backgroundColor: '#42b8ba',
                        backgroundColor: 'white',
                        zIndex: 98,
                        opacity: this.state.opacity

                    },
                    textInput: {
                        top: -7,
                        height: "100%",
                        width: "100%",
                        margin: 0,
                        padding: 0,
                        borderRadius: 0,
                        backgroundColor: "transparent"

                    },
                    listView: {
                        position: 'absolute',
                        backgroundColor: 'white',
                        //backgroundColor: 'transparent',
                        // height: Dimensions.get('window').height,
                        zIndex: 98,
                        top: 80,
                        width: "70%"
                    },
                    description: {
                        fontWeight: 'bold',
                        fontSize: 18,
                        height: 40
                        //color: 'white'
                    },
                }}

            />
        )
    }
}


const mapStateToProps = (state) => {
    // console.log("SearchBar mapStateToProps called");
    // console.log(state.searchBar);
    return {
        focused: state.searchBar.focusClicked,
        blurred: state.searchBar.blurClicked
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        focus: (status) => {
            dispatch(focusClick(status));
        },
        blur: (status) => {
            dispatch(blurClick(status));
        },
        sendLocation: (latitude, longitude) => {
            dispatch(sendLocData(latitude, longitude));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);