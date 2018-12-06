import React, { Component } from 'react';
import { Image } from 'react-native';

class LogoTitle extends React.Component {
    render() {
      return (
        <Image
          source={require('../images/SpotMe_Logo.png')}
          style={{ width: 120, height: 35, marginBottom: 10 }}
        />
      );
    }
  }

  export default LogoTitle;