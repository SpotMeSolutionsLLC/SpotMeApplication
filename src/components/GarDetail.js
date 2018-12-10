import React from 'react';
import { View } from 'react-native';
import styles from 'Styling.style.js';
import { PerGarageInfo } from './PerGarageInfo';

//Gets details on garages
const GarDetail = (props) => {
    return (
             <View style={styles.garDetail.containerStyle}>
               <View style={styles.garDetail.garageStyle}>
                <PerGarageInfo
                    spotsNum={props.parking.id}
                    garageName={props.parking.name}
                    garageAddress={props.parking.email}
                />
              </View>
           </View>
    );
};

export default GarDetail;
