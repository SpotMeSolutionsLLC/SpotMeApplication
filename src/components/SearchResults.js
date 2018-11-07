/*import React from 'react';
import { Text } from 'react-native';
import { View, List, ListItem, Left, Body } from 'native-base';

import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchResults = ({ // component for handling list of recommendation
  predictions,
  getSelectedAddress,
  fetchSanJoseAPI
}) => {
  function handleSelectedAddress(placeID, garageFullText) {
    getSelectedAddress(placeID);
    fetchSanJoseAPI(garageFullText);
  }

  return (
    <View style={styles.searchResultsWrapper}>
      <List
        dataArray={predictions}
        renderRow={item => (
          <View>
            <ListItem
              onPress={() => handleSelectedAddress(item.placeID, item.fullText)}
              button
              avatar
            >
              <Left style={styles.leftContainer}>
                <Icon style={styles.leftIcon} name='location-on' />
              </Left>
              <Body>
                <Text style={styles.primaryText}>{item.primaryText}</Text>
                <Text style={styles.secondaryText}>{item.secondaryText}</Text>
              </Body>
            </ListItem>
          </View>
        )}
      />
    </View>
  );
};

const styles = {
  searchResultsWrapper: {
    top: 100,
    position: 'absolute',
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    opacity: 0.9
  },
  primaryText: {
    fontWeight: 'bold',
    color: '#373737'
  },
  secondaryText: {
    fontStyle: 'italic',
    color: '#7D7D7D'
  },
  leftContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderLeftColor: '#7D7D7D'
  },
  leftIcon: {
    fontSize: 20,
    color: '#7D7D7D'
  },
  distance: {
    fontSize: 12
  }
};

export default SearchResults;
*//*
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import axios from 'axios';

export default class Testing extends Component {
  render() {
  let data = axios.get('http://api.data.sanjoseca.gov/api/v2/datastreams/PARKI-GARAG-DATA/data.json/?auth_key=974e8db20c97825c8fe806dcbeaa3889c7b8c921&limit=50');
  console.log(data);
  console.log(data.Promise);
  //console.log(data.Promise._55._55.data.result);
  data = JSON.stringify(data);
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{data}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});*/

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import GarList from './GarList.js';

export default class Testing extends Component {
  render() {
    return(
      <View>
        <GarList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: Constants.statusBarHeight,
  backgroundColor: '#ecf0f1',
  }
});
