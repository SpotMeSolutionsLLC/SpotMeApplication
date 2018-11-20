import React, { Component } from 'react';
import { Text, View, Image, Button, Dimensions } from 'react-native';

class Payment extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.imageStyle}>
          <Button
            onPress={() => this.props.navigation.openDrawer()}
            title='Back'
          />

          <Text style={styles.headerText}>Santa Clara Garage </Text>

          <Image
            source={require('../images/icon.jpg')}
          />
        </View>

        <View style={styles.detailStyle}>
          <Text style={styles.detailTextTitle}>Select Vehicle</Text>
        </View>

        <View style={styles.detailStyle}>
          <Text style={styles.detailText}> Licence Model</Text>
        </View>

        <View style={styles.detailStyle}>
          <Text style={styles.detailText}> A2M3C BMW</Text>
        </View>

        <View style={styles.detailStyle}>
          <Text style={styles.detailText}> A2M3C Honda</Text>
        </View>

        <View style={styles.detailStyle}>
          <Text style={styles.detailTextTitle}>Select Card</Text>
        </View>

        <View style={styles.detailStyle}>
          <Text style={styles.detailText}> Number Card Expire</Text>
        </View>

        <View style={styles.detailStyle}>
          <Text style={styles.detailText}> 5871****** VISA 02/09</Text>
        </View>

        <View style={styles.detailStyle}>
          <Text style={styles.detailText}> 8902****** Master 02/09</Text>
        </View>
        <View style={styles.payStyle}>
          <Button
          title='confirm'
          onPress={() => {}}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 15,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  headerStyle: {
    margin: 30
  },
  detailStyle: {
    margin: 10
  },
  payStyle: {
    marginTop: 20,
    marginLeft: 130
  },
  imageStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 30,
      color: '#379b8c',
      fontWeight: '900'
  },
  detailText: {
    fontSize: 20
  },
  detailTextTitle: {
    fontSize: 20,
    textDecorationLine: 'underline'
  }
};
export default Payment;
