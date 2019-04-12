import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { getColor } from "../../functions";

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'column',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleName: {
        fontSize: 22,
        fontWeight: "bold",
        color: 'white',
        textAlign: "center",
        fontFamily: "OpenSans",
    },
    titleWrapper: {
        height: "35%",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#00bdfb",
    },
    currentValueContainer: {
        height: "30%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    currentValue: {
        fontFamily: "OpenSans",
        fontSize: 25,
        color: '#00bdfb',
        fontWeight: "bold",
    },
    barContainerWrapper: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    barIndicatorText: {
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 25,
        width: "25%",
        textAlign: "center",
    },
    barContainer: {
        width: "75%",
        height: 50,
        borderWidth: 2,
        backgroundColor: "white",
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden",
    },
    barLeft: {
        height: "100%",
    },
})

class GarageInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={[styles.titleWrapper, {
                    backgroundColor: getColor(this.props.spotsNum / this.props.garageMax * 100)
                }]}>
                    <Text style={styles.titleName}>
                        {this.props.garageName}
                    </Text>
                </View>

                <View style={styles.currentValueContainer}>
                    <Text style={[styles.currentValue, {
                        color: getColor(this.props.spotsNum / this.props.garageMax * 100),
                    }]}>
                        {this.props.spotsNum + " / " + this.props.garageMax}
                    </Text>
                </View>
                <View style={styles.barContainerWrapper}>

                    <Text style={[styles.barIndicatorText,{
                        color: getColor(this.props.spotsNum / this.props.garageMax * 100)
                    }]}>
                        {Math.floor((this.props.spotsNum / this.props.garageMax * 100))}%
                    </Text>

                    <View style={[styles.barContainer, {
                        borderColor: getColor(this.props.spotsNum / this.props.garageMax * 100)
                    }]}>
                        <View style={[styles.barLeft, {
                            backgroundColor: getColor(this.props.spotsNum / this.props.garageMax * 100),
                            width: `${this.props.spotsNum / this.props.garageMax * 100}%`
                        }]}/>
                    </View>
                </View>
            </View>
        )
    }
}

export default GarageInfo;
