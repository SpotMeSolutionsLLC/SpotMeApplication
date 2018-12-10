import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

 const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
   return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
 const styles = {
  buttonStyle: {
    borderBottomWidth: 3,
    //padding: 5,
    backgroundColor: '#029BDE',
    //justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#000000',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 20,
    height: 40,
    width: 150,
    elevation: 1,
    // marginLeft: 20,
    // marginRight: 20,
    // marginTop: 20,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    //paddingTop: 10,
    //paddingBottom: 10
  }
};
 export { Button };
