import React, { Component } from 'react';
import { Text, View, Image, Button, Dimensions } from 'react-native';

import styles from "./Styling.style.js";

class Favorite extends Component {
    render() {
        return (
            <View style={styles.favorite.containerStyle}>

                <View style={styles.favorite.imageStyle}>
                    <Button
                        onPress={() => this.props.navigation.openDrawer()}
                        title='Back'
                    />
                    <Text
                        style={styles.favorite.headerText}
                    >
                        Favorite </Text>

                    <Image
                        source={require('../images/icon.jpg')}
                    />
                </View>


                <View style={styles.favorite.garageNameStyle}>
                    <View style={styles.favorite.detailStyleLeftColumn}>
                        <Text style={styles.favorite.subHeaderText}>Garage</Text>
                    </View>

                    <View style={styles.favorite.detailStyleRightColumn}>
                        <Text style={styles.favorite.subHeaderText}>Occupancy</Text>
                    </View>
                </View>

                <View style={styles.favorite.garageNameStyle}>
                    <View style={styles.favorite.detailStyleLeftColumn}>
                        <Text style={styles.favorite.detailText}>SanFrancisco </Text>
                    </View>
                    <View style={styles.favorite.detailStyleRightColumn}>
                        <Text style={styles.favorite.detailText}>L1 80/100</Text>
                        <Text style={styles.favorite.detailText}>L2 100/100</Text>
                        <Text style={styles.favorite.detailText}>L3 70/100</Text>
                        <Text style={styles.favorite.detailText}>L4 90/100</Text>
                    </View>
                </View>

                <View style={styles.favorite.garageNameStyle}>
                    <View style={styles.favorite.detailStyleLeftColumn}>
                        <Text style={styles.favorite.detailText}>San Jose state</Text>
                    </View>
                    <View style={styles.favorite.detailStyleRightColumn}>
                        <Text style={styles.favorite.detailText}>50/200</Text>
                    </View>
                </View>

                <View style={styles.favorite.garageNameStyle}>
                    <View style={styles.favorite.detailStyleLeftColumn}>
                        <Text style={styles.favorite.detailText}>Santa Clara</Text>
                    </View>
                    <View style={styles.favorite.detailStyleRightColumn}>
                        <Text style={styles.favorite.detailText}>80/150</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default Favorite;
