import React from 'react';
import { View, Text } from 'react-native';
import  {GarageBottomLine}  from './GarageBottomLine';

const PerGarageInfo = (props) => {
  const { containerStyle, leftSectionStyle, rightSectionStyle, generalStyle } = styles;
  return (
    <View style={containerStyle}>

      <View style={leftSectionStyle}>
        <Text style={{ fontSize: 27, color: 'white' }}>
        {props.spotsNum}
        </Text>
      </View>

      <View style={rightSectionStyle}>
        <View style={generalStyle}>
          <Text style={{ fontSize: 20, color: 'blue' }}>
          {props.garageName}
          </Text>
        </View>

        <View style={generalStyle}>
          <Text style={{ fontSize: 15, color: 'white' }}>
          {props.garageAddress}
          </Text>
        </View>

         <View style={generalStyle}>
          <GarageBottomLine
          perLev={'Level 1:     '}
          miles={'--- Distance'}
          price={'--- Cost'}

          // stars={props.parking.id}
          // miles={props.parking.id}
          // price={props.parking.id}

          />
        </View>
      </View>

    </View>

  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    marginLeft: 7,
    marginRight: 7,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSectionStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
  rightSectionStyle: {
    flexDirection: 'column',
    flex: 5,
  },
  generalStyle: {
    marginTop: 2,
    marginBottom: 2,
  }
};

export { PerGarageInfo };