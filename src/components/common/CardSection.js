import React from 'react';
import { View } from 'react-native';
//justifyContent: 'flex-start',
const CardSection = (props) => {
  return (
      <View style={styles.containerStyle}>
        {props.children}
      </View>
  );
};
const styles = {
  containerStyle: {
    borderBottomWidth: 3,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#000000',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 20,
    height: 40,
    width: 300,
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  }
};
 export { CardSection };
