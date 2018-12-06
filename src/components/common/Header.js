// Import libraries for making a Component
import React from 'react';
import { Text, View } from 'react-native';

// in viewstyle
    //height: 60,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // Create a Component
const Header = (props) => {
  const { SpotMeStyle, viewStyle, SolutionStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={SpotMeStyle}>SpotMe</Text>;
      <Text style={SolutionStyle}>S  o  l  u  t  i  o  n</Text>;
    </View>

  );
};
 const styles = {
  viewStyle: {
    backgroundColor: '#1A9BE2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    elevation: 2,
    position: 'relative'
  },
  SpotMeStyle: {
    fontSize: 50,
    marginBottom: 20,
    marginTop: 10,
    fontWeight: 'bold'
  },
  SolutionStyle: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 40,
  }
};
export { Header };
