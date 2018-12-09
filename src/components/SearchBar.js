import React, { Component } from 'react';
import {
    Dimensions,
} from 'react-native';

import { connect } from 'react-redux';

import {
    focusClick,
    blurClick,
    sendLocData,
} from '../actions/searchActions';

import GoogleSearchResults from './GoogleSearchResults';

//import styles from './Styling.style';

//The search bar for finding a location
//Used to send user to a different location view on the map and let them find garages
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0.5,
            width: Dimensions.get('window').width * 0.8,
        };
    }

    onFocus() {
        console.log('focused');
        // this.setState({
        //     opacity: 1
        // });
    }

    onBlur() {
        console.log('blurred');
        // this.setState({
        //     opacity: 0.5
        // })
    }

    //If a location is selected, the latitude and longitude of the
    //location is sent
    onResultPress = (details) => {
        console.log('onPress');
        this.props.sendLocation(details.lat, details.lng);
    }

    componentDidUpdate(){
        // console.log('SearchBar Updated');
        if(this.props.focused){
            this.refs.googleRef.onFocus();
            this.props.focus(false);
        }
        if(this.props.blurred){
            this.refs.googleRef.onBlur();
            this.props.blur(false);
        }
    }

    //Renders the search bar and search results view
    render() {
        return (
            <GoogleSearchResults
                ref='googleRef'
                onPress={this.onResultPress}
            />
        );
    }
}


const mapStateToProps = (state) => {
    // console.log('SearchBar mapStateToProps called');
    // console.log(state.searchBar);
    return {
        focused: state.searchBar.focusClicked,
        blurred: state.searchBar.blurClicked
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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