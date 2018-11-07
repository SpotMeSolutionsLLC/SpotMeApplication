import React from 'react';
import { View, Text } from 'react-native';
import { GarageBottomLine } from './GarageBottomLine';


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

                <View style={styles.rightSectionStyle}>
                    


                    <View style={[styles.generalStyle, {
                        alignContent: "center"
                    }]}>
                        {/* <GarageBottomLine
                            perLev={'Level 1: 49  '} // per garage levels
                            miles={'    4.2 mi'} //props.parking.distance
                            price={' $$$ '}
                        /> */}
                        <Text>
                            {(this.props.spotsNum / this.props.garageMax) * 100 + "% Full"}
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
        borderColor: 'black',
        borderWidth: 2,
    },
    leftSectionStyle: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        width: "20%"
        
    },
    rightSectionStyle: {
        flexDirection: 'column',
        flex: 1,
        width:"20%",
        borderColor: 'black',
        borderWidth: 2,
    },
    generalStyle: {
        marginTop: 2,
        marginBottom: 2,
    }
};

export { PerGarageInfo };
