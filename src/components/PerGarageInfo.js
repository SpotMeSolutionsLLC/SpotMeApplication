import React from 'react';
import { View, Text, Image } from 'react-native';
import { colors } from 'react-native-elements';

import styles from "./Styling.style.js";

class PerGarageInfo extends React.Component {
    constructor(props) {
        super(props);
    }


    getColor(percentage) {
        if(percentage < 25){
            return "green";
        }
        else if(percentage < 50){
            return "yellow";
        }
        else if(percentage < 75){
            return "orange";
        }
        else{
            return "red";
        }
    }

    render() {
        return (
            <View style={styles.perGarageInfo.containerStyle}>

                <View style={styles.perGarageInfo.leftSectionStyle}>
                    <View style={styles.perGarageInfo.generalStyle}>
                        <Text style={{ fontSize: 40, color: 'blue' }}>
                            {this.props.garageName}
                        </Text>
                    </View>

                    <Text style={{ fontSize: 23, color: 'white' }}>
                        {this.props.spotsNum + " / " + this.props.garageMax}
                    </Text>
                </View>

                <View style={[styles.perGarageInfo.rightSectionStyle,{
                    justifyContent: "center",
                    alignItems: "center",
                }]}>
                    


                    <View style={[styles.perGarageInfo.generalStyle, {
                        alignItems: "center",
                        
                    }]}>
                        <Text style={[styles.perGarageInfo.textStyle,{
                            backgroundColor: this.getColor(this.props.spotsNum /this.props.garageMax * 100)
                        }]}>
                            {Math.floor((this.props.spotsNum /this.props.garageMax * 100))}%
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}


export { PerGarageInfo };
