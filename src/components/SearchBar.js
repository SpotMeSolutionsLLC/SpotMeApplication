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
    sendLocData,
} from "../actions/searchActions"

import { connect } from "react-redux";

import GoogleSearchResults from "./GoogleSearchResults";

import styles from "./Styling.style";


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0.5,
            width: Dimensions.get("window").width * .8,
        }
        // this.onFocus = this.onFocus.bind(this);
        // this.onBlur = this.onBlur.bind(this);
    }

    onFocus() {
        console.log("focused");
        // this.setState({
        //     opacity: 1
        // });
    }

    onBlur() {
        console.log("blurred");
        // this.setState({
        //     opacity: 0.5
        // })
    }

    onResultPress = (details) => {
        console.log("onPress");
        this.props.sendLocation(details.lat, details.lng);
    }

    componentDidUpdate(){
        // console.log("SearchBar Updated");
        if(this.props.focused){
            this.refs.googleRef.onFocus();
            this.props.focus(false);
        }
        if(this.props.blurred){
            this.refs.googleRef.onBlur();
            this.props.blur(false);
        }
    }

    render() {
        return (
            <GoogleSearchResults
                ref="googleRef"
                onPress = {this.onResultPress}
            >
                
            </GoogleSearchResults>
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
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);