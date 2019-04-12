import React from 'react';
import { Image } from 'react-native';

const TutImages = (props) => {
      return (
        <Image
        //   source={require('../images/real_time.png')}
          source={props.image}
          style={{ width: 200, height: 200, marginTop: 50 }}
        />
      ); 
  };

export default TutImages;
