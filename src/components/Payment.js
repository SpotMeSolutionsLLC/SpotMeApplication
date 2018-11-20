import React, { Component } from 'react';
import { Text, View, Image, Button, Dimensions } from 'react-native';

import styles from "./Styling.style.js";

class Payment extends Component {
    render() {
        return (
            <View style={styles.payment.containerStyle}>
                <View style={styles.payment.imageStyle}>
                    <Button
                        onPress={() => this.props.navigation.openDrawer()}
                        title='Back'
                    />

                    <Text style={styles.payment.headerText}>Santa Clara Garage </Text>

                    <Image
                        source={require('../images/icon.jpg')}
                    />
                </View>

                <View style={styles.payment.detailStyle}>
                    <Text style={styles.payment.detailTextTitle}>Select Vehicle</Text>
                </View>

                <View style={styles.payment.detailStyle}>
                    <Text style={styles.payment.detailText}> Licence Model</Text>
                </View>

                <View style={styles.payment.detailStyle}>
                    <Text style={styles.payment.detailText}> A2M3C BMW</Text>
                </View>

                <View style={styles.payment.detailStyle}>
                    <Text style={styles.payment.detailText}> A2M3C Honda</Text>
                </View>

                <View style={styles.payment.detailStyle}>
                    <Text style={styles.payment.detailTextTitle}>Select Card</Text>
                </View>

                <View style={styles.payment.detailStyle}>
                    <Text style={styles.payment.detailText}> Number Card Expire</Text>
                </View>

                <View style={styles.payment.detailStyle}>
                    <Text style={styles.payment.detailText}> 5871****** VISA 02/09</Text>
                </View>

                <View style={styles.payment.detailStyle}>
                    <Text style={styles.payment.detailText}> 8902****** Master 02/09</Text>
                </View>
                <View style={styles.payment.payStyle}>
                    <Button
                        title='confirm'
                        onPress={() => { }}
                    />
                </View>
            </View>
        );
    }
}

export default Payment;
