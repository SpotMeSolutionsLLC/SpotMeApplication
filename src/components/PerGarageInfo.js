import React from 'react';
import { View, Text, Image } from 'react-native';
import { GarageBottomLine } from './GarageBottomLine';
import { colors } from 'react-native-elements';



class PerGarageInfo extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.containerStyle}>

                <View style={styles.leftSectionStyle}>
                    <View style={styles.generalStyle}>
                        <Text style={{ fontSize: 40, color: 'blue' }}>
                            {this.props.garageName}
                        </Text>
                    </View>

                    <Text style={{ fontSize: 23, color: 'white' }}>
                        {this.props.spotsNum + " / " + this.props.garageMax}
                    </Text>
                </View>

                <View style={[styles.rightSectionStyle,{
                    justifyContent: "center",
                    alignItems: "center",
                }]}>
                    


                    <View style={[styles.generalStyle, {
                        alignItems: "center",
                        
                    }]}>
                        {/* <GarageBottomLine
                            perLev={'Level 1: 49  '} // per garage levels
                            miles={'    4.2 mi'} //props.parking.distance
                            price={' $$$ '}
                        /> */}
                        <Text style={{
                            fontSize: 40,
                            color: "white",
                            textAlign: "center",
                            textAlignVertical:"center",
                            backgroundColor: "orange",
                            borderRadius: 40,
                            fontWeight: "900",
                            borderColor: 'black',
                            borderWidth: 4,
                            height: 100,
                            width: 150
                        }}>
                            {Math.floor((this.props.spotsNum /this.props.garageMax * 100))}%
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        marginLeft: 7,
        marginRight: 7,
        marginTop: 10,
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftSectionStyle: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        width: "20%",
        
    },
    rightSectionStyle: {
        flexDirection: 'column',
        flex: 1,
        width:"20%",
        height:"100%"
    },
    generalStyle: {
        marginTop: 2,
        marginBottom: 2,

    }
};

export { PerGarageInfo };
