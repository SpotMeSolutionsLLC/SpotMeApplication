import React, { Component } from 'react';
import {
    Dimensions,
} from 'react-native';


import { connect } from "react-redux";

import GoogleSearchResults from "./GoogleSearchResults";

import PubSub from "pubsub-js";


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0.5,
            width: Dimensions.get("window").width * .8,
        }
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        PubSub.subscribe("onFocus", this.onFocus);
        PubSub.subscribe("onBlur", this.onBlur);
    }

    onFocus() {
        PubSub.publish("slideDown");
        console.log("focused");
        this.refs.googleRef.onFocus();
        // this.setState({
        //     opacity: 1
        // });
    }

    onBlur() {
        console.log("blurred");
        this.refs.googleRef.onBlur();
        // this.setState({
        //     opacity: 0.5
        // })
    }

    onResultPress = (details) => {
        console.log("onpress");
        PubSub.publish("changeLocation", {
            lat: details.lat,
            lng: details.lng
        });

    }

    render() {
        return (
            <GoogleSearchResults
                ref="googleRef"
                onPress = {this.onResultPress}
                onFocus = {this.onFocus}
            >
                
            </GoogleSearchResults>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);