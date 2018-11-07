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
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'blue' }}>
        {props.perLev}
        </Text>
      </View>

      <View style={middlePartStyle}>
      
        <Text style={{ fontSize: 12, color: 'blue' }}>
        {props.miles}
        </Text>
      </View>

      <View style={rightPartStyle}>
        <Text style={{ fontSize: 12, color: 'white' }}>
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
  },
  middlePartStyle: {
    flex: 1,
  },
  rightPartStyle: {
    flex: 1,
  }
};

export { GarageBottomLine };
