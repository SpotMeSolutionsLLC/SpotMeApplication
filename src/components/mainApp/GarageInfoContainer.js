import React, { Component } from 'react';
import {
    View,
    Animated,
    Image,
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';

import GarageInfo from './GarageInfo';
import loadingImage from './images/loading.gif';

import { getGarageData } from "../../functions";

const garListHeight = 180;

const garList = StyleSheet.create({
    height: garListHeight,

    garageStyle: {
        borderBottomWidth: 0.75,
        paddingBottom: 5 + 20,
        height: garListHeight
    },
    headerContentStyles: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    containerStyle: {
        //backgroundColor: '#def1fc',
        backgroundColor: "white",
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'flex-start',
        position: 'absolute',
        left: 0,
        elevation: 5,
    },
});


//List of garages, gets information on garages (name, parking spaces, etc)
class GarInfoContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parkingsName: '',
            parkingsMax: 0,
            parkingsCurrent: 0,
            dataLoaded: false,
            bottom: new Animated.Value(-(garList.containerStyle.height)),
            showInfo: false,
            keyName: "",
        };
    }

    updateData = async () => {
        let data = await getGarageData(this.state.keyName);
        this.setState({
            parkingsName: data.name,
            parkingsMax: data.max,
            parkingsCurrent: data.current,
            dataLoaded: true,
        })
    }

    //When loading is finished, garage information is returned
    whenDoneLoading() {
        if (this.state.dataLoaded) {
            return (
                <GarageInfo
                    spotsNum={this.state.parkingsCurrent}
                    garageName={this.state.parkingsName}
                    garageMax={this.state.parkingsMax}
                />
            );
        }
        else {
            this.updateData();
            return (
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: garList.height
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

    getGarageListInfo() {
        return (this.state.showInfo) ? this.whenDoneLoading() : null;
    }

    componentWillReceiveProps(newProps) {
        (newProps.showInfo && newProps.keyName != this.state.keyName) ? this.setState({
            keyName: newProps.keyName,
            showInfo: newProps.showInfo,
            dataLoaded: false,
        }, () => {
            this.slideUp();
        }) : this.setState({
            keyName: "",
            showInfo: newProps.showInfo,
            parkingsName: '',
            parkingsMax: 0,
            parkingsCurrent: 0,
            dataLoaded: false,
        }, () => {
            this.slideDown();
        });
    }

    //Upon execution of chart table
    // styling is changed for the garage information container based on platform
    slideUp() {
        if (Platform.OS === 'android') {
            Animated.timing(this.state.bottom, {
                toValue: -(garList.containerStyle.height - garList.height),
                duration: 100
            }).start();
        }
        else {
            this.setState({
                bottom: -(garList.containerStyle.height - garList.height)
            });
        }
    }

    //Upon execution of closing chart table/clicking off of it
    //Styling is changed for the garage info container based on platform

    slideDown() {
        if (Platform.OS === 'android') {
            Animated.timing(this.state.bottom, {
                toValue: -(garList.containerStyle.height),
                duration: 100
            }).start();
            this.setState({
                status: 0
            });
        }
        else {
            this.setState({
                status: 0,
                bottom: -(garList.containerStyle.height),
            });
        }
    }


    //Renders garage information/loads garage information upon rendering
    render() {
        return (
            <Animated.View style={[garList.containerStyle, { bottom: this.state.bottom }]}>
                <View style={garList.garageStyle}>
                    {this.getGarageListInfo()}
                </View>
            </Animated.View>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        showInfo: state.garageInfo.showInfo,
        keyName: state.garageInfo.key
    }
}


const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GarInfoContainer);

