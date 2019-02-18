import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';

import { favoriteStyle } from './Styling.style.js';

//Favorites page
class Favorite extends Component {
    render() {
        return (
            <View style={favoriteStyle.containerStyle}>

                <View style={favoriteStyle.imageStyle}>
                    <Button
                        onPress={() => this.props.navigation.openDrawer()}
                        title='Back'
                    />
                    <Text
                        style={favoriteStyle.headerText}
                    >
                        Favorite </Text>

                    <Image
                        source={require('./images/icon.jpg')}
                    />
                </View>


                <View style={favoriteStyle.garageNameStyle}>
                    <View style={favoriteStyle.detailStyleLeftColumn}>
                        <Text style={favoriteStyle.subHeaderText}>Garage</Text>
                    </View>

                    <View style={favoriteStyle.detailStyleRightColumn}>
                        <Text style={favoriteStyle.subHeaderText}>Occupancy</Text>
                    </View>
                </View>

                <View style={favoriteStyle.garageNameStyle}>
                    <View style={favoriteStyle.detailStyleLeftColumn}>
                        <Text style={favoriteStyle.detailText}>SanFrancisco </Text>
                    </View>
                    <View style={favoriteStyle.detailStyleRightColumn}>
                        <Text style={favoriteStyle.detailText}>L1 80/100</Text>
                        <Text style={favoriteStyle.detailText}>L2 100/100</Text>
                        <Text style={favoriteStyle.detailText}>L3 70/100</Text>
                        <Text style={favoriteStyle.detailText}>L4 90/100</Text>
                    </View>
                </View>

                <View style={favoriteStyle.garageNameStyle}>
                    <View style={favoriteStyle.detailStyleLeftColumn}>
                        <Text style={favoriteStyle.detailText}>San Jose state</Text>
                    </View>
                    <View style={favoriteStyle.detailStyleRightColumn}>
                        <Text style={favoriteStyle.detailText}>50/200</Text>
                    </View>
                </View>

                <View style={favoriteStyle.garageNameStyle}>
                    <View style={favoriteStyle.detailStyleLeftColumn}>
                        <Text style={favoriteStyle.detailText}>Santa Clara</Text>
                    </View>
                    <View style={favoriteStyle.detailStyleRightColumn}>
                        <Text style={favoriteStyle.detailText}>80/150</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default Favorite;
