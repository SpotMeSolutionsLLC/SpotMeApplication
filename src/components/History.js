import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';

import styles from "./Styling.style.js";

class History extends Component {
  render() {
  return (
    <View style={styles.history.containerStyle}>
    <View style={styles.history.imageStyle}>
    <Button
    onPress={() => this.props.navigation.openDrawer()}
    title='back'
    />
    <Text style={styles.history.headerText}>Recently Searched </Text>

      <Image
        source={require('../images/icon.jpg')}
      />
    </View>

      <View style={styles.history.garageNameStyle}>
        <View style={styles.history.detailStyleLeftColumn}>
          <Text style={styles.history.subHeaderText}>Name</Text>
        </View>

        <View style={styles.history.detailStyleRightColumn}>
          <Text style={styles.history.subHeaderText}>Slots</Text>
        </View>
       
        <View style={styles.history.detailStyleRightColumn}>
          <Text style={styles.history.subHeaderText}>Price</Text>
        </View>
      </View>

      <View style={styles.history.garageNameStyle}>
        <View style={styles.history.detailStyleLeftColumn}>
          <Text style={styles.history.detailText}>Santa Clara</Text>
        </View>
        <View style={styles.history.detailStyleRightColumn}>
          <Text style={styles.history.detailText}>120/250</Text>
        </View>
      
      <View style={styles.history.detailStyleRightColumn}>
      <Text style={styles.history.detailText}>$8/hr</Text>
    </View>
      </View>

      <View style={styles.history.garageNameStyle}>
        <View style={styles.history.detailStyleLeftColumn}>
          <Text style={styles.history.detailText}>San Jose</Text>
        </View>
        <View style={styles.history.detailStyleRightColumn}>
          <Text style={styles.history.detailText}>100/200</Text>
        </View>
      
      <View style={styles.history.detailStyleRightColumn}>
      <Text style={styles.history.detailText}>$10/hr</Text>
    </View>
      </View>

      <View style={styles.history.garageNameStyle}>
        <View style={styles.history.detailStyleLeftColumn}>
          <Text style={styles.history.detailText}>SF</Text>
        </View>
        <View style={styles.history.detailStyleRightColumn}>
          <Text style={styles.history.detailText}>220/350</Text>
        </View>
      
      <View style={styles.history.detailStyleRightColumn}>
      <Text style={styles.history.detailText}>$15/hr</Text>
    </View>
      </View>
    </View>

  );
}
}

export default History;
