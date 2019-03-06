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
        justifyContent: 'center',
    },
    titleName: {
        fontSize: 30,
        color: 'black',
        textAlign: "center",
        fontFamily: "OpenSans",
        height:"50%",
    },
    barContainer: {
        width: "80%",
        height: 50,
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "white",
    },
    barLeft:{
        height: "100%",
    },
    barIndicatorText:{
        fontFamily: "OpenSans",
        fontSize: 30
    },
    barIndicatorWrapper:{
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})

class GarageInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <View style={styles.containerStyle}>

                <Text style={styles.titleName}>
                    {this.props.garageName}
                </Text>

                <View style={styles.currentValues}>
                    <Text style={{ fontSize: 23, color: 'white' }}>
                        {this.props.spotsNum + " / " + this.props.garageMax}
                    </Text>
                </View>

                <View style={styles.barContainer}>
                    <View style={[styles.barLeft,{
                        backgroundColor: getColor(this.props.spotsNum / this.props.garageMax * 100),
                        width: `${this.props.spotsNum/this.props.garageMax * 100}%`
                    }]}>

                    </View>
                    <View style={styles.barIndicatorWrapper}>
                        <Text
                            style={styles.barIndicatorText}
                        >
                            {Math.floor((this.props.spotsNum / this.props.garageMax * 100))}%
                        </Text>
                    </View>

                </View>
            </View>
        )
    }
}

export default GarageInfo;
