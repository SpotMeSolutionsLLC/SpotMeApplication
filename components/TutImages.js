import React, { Component } from 'react';
import { Image } from 'react-native';

const TutImages = (props) => {
    
      return (
        <Image
        //   source={require('../images/real_time.png')}
          source={props.image}
          style={{ width: 250, height: 250, marginTop: 50 }}
        />
      );
    
  }

  export default TutImages;