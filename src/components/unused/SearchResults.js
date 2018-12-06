import React from 'react';
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

