import React from 'react';
import { View } from 'react-native';

 const ButtonSection = (props) => {
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    //justifyContent: 'flex-start',
  }
};
 export { ButtonSection };
