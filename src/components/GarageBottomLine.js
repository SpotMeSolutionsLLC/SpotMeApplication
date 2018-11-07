import React from 'react';
import { View, Text, Image } from 'react-native';

const GarageBottomLine = (props) => {
  const {
    containerStyle,
    leftPartStyle,
    middlePartStyle,
    rightPartStyle
  } = styles;

  return (
    <View style={containerStyle}>

      <View style={leftPartStyle}>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'blue' }}>
        {props.perLev}
        </Text>
      </View>

      <View style={middlePartStyle}>
        <Text style={{ fontSize: 10, color: 'white' }}>
        {props.miles}
        </Text>
      </View>

      <View style={rightPartStyle}>
        <Text style={{ fontSize: 10, color: 'white' }}>
        {props.price}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  leftPartStyle: {
    flex: 1,
    textAlign: 'center',
  },
  middlePartStyle: {
    flex: 1,
    textAlign: 'center'
  },
  rightPartStyle: {
    flex: 1,
    textAlign: 'center'
  }
};

export { GarageBottomLine };