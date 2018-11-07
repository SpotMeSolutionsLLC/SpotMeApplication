import React from 'react';
import {View,Text} from 'react-native';
//import Card from './basic/Card';
//import CardSection from './basic/CardSection';
import {PerGarageInfo} from './PerGarageInfo';

const GarDetail = (props) =>  {

    return (

             <View style={styles.containerStyle}>
               <View style={styles.garageStyle}>
                <PerGarageInfo
                    spotsNum={props.parking.id}
                    garageName={props.parking.name}
                    garageAddress={props.parking.email}
                />
              </View>
           </View>

    );

};

const styles = {
    headerContentStyles: {
        flexDirection: 'coloumn',
        justifyContent: 'space-around'
    },
    garageStyle: {
        borderBottomColor: 'blue',
        borderBottomWidth: 0.75,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 5,
        marginBottom: 5
      },
      containerStyle: {
        backgroundColor: '#A0CFEC',
        height: 200,
        width: 325,
        borderRadius: 15,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 400,
        marginBottom: 35,
        justifyContent: 'center'
      },
};


export default GarDetail;
