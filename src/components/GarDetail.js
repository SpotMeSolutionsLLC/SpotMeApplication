import React from 'react';
import {View,Text} from 'react-native';
//import Card from './basic/Card';
//import CardSection from './basic/CardSection';
import {PerGarageInfo} from './PerGarageInfo';

import styles from "Styling.style.js";

const GarDetail = (props) =>  {

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
