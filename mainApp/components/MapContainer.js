import React, { Component } from 'react';
import {
    View,
    Platform,
} from 'react-native';

import { connect } from 'react-redux';
import { Speech, Constants, Location, Permissions } from 'expo';
import Axios from 'axios';
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import { getMarkerColor } from '../actions/speechActions';
import MidnightCommander from '../mapstyles/MidnightCommander';
import styles from './Styling.style.js';
import store from "../../redux";

//Container for the map, used to load stuff onto map such as markers
class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            coordinate: {
                latitude: 0,
                longitude: 0
            },
            currentLoc: {
                latitude: 0,
                longitude: 0
            }
        };
        Axios.get('https://project-one-203604.appspot.com/garages/getMarkers').then((res) => {
            console.log(res.data);
            this.setState({
                markers: res.data
            });
        });

        Location.watchPositionAsync({
            enableHighAccuracy: true,
        }, (data) => {
            console.log("loc updated");
            this.setState({
                currentLoc: {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                }
            })
        })

        this.initialLocation = {
            latitude: 37.333088,
            longitude: -121.880797,
            latitudeDelta: 0.00212,
            longitudeDelta: 0.002412
        };
        this.changeLocation = this.changeLocation.bind(this);

        PubSub.subscribe("changeLocation", this.changeLocation);
        PubSub.subscribe("sendBack", (data) => {
            PubSub.publish(data.publishLoc, {
                references: this
            });
        });
    }
    getMarkers() {
        return this.state.markers.map(markerInstance => (
            <Marker
                coordinate={{ latitude: markerInstance.lat, longitude: markerInstance.lng }}
                //Can later pull coord, title, descrip from API when implemented
                title={markerInstance.name}
                // description={markerInstance.description}
                style={styles.MapContainer.markerStyle}
                image={require('../images/spotmarker.png')}
                key={markerInstance.key}
                onPress={(e) => {
                    e.stopPropagation();
                    PubSub.publish("slideUp");
                    PubSub.publish("updateData", {
                        key: markerInstance.key
                    });
                    PubSub.publish("onBlur");
                }}
            />
        ));
    }

    changeLocation(context, data) {
        lat = parseFloat(data.lat);
        lng = parseFloat(data.lng);
        this.setState({
            coordinate: {
                latitude: lat,
                longitude: lng
            }
        });

        this.mapRef._component.animateToCoordinate({
            latitude: lat,
            longitude: lng,
        });
    }

    render() {
        return (
            <MapView.Animated

                provider={PROVIDER_GOOGLE}
                style={styles.MapContainer.map}
                //props error on region, expected number but got object
                //error doesnt have big effect/matter but gives a warning
                initialRegion={this.initialLocation}
                //   customMapStyle={MidnightCommander}
                ref={(instance) => {
                    this.mapRef = instance;
                }}

                customMapStyle={MidnightCommander}

                onPress={() => {
                    console.log(this.props);
                    PubSub.publish("onBlur");
                    PubSub.publish("slideDown");
                }}
            >
                <View >
                    <Marker.Animated
                        coordinate={this.state.coordinate}
                        description={'Your Destination'}
                        style={styles.MapContainer.markerStyle}
                        ref={marker => {
                            this.marker = marker;
                        }}
                        image={require('../images/banana.png')}
                    />


                </View>

                <Marker
                    coordinate={{ latitude: this.state.currentLoc.latitude, longitude: this.state.currentLoc.longitude }}
                    description={'Current Location'}
                    //Current location being called multiple times, may affect rendering
                    //onPress={Speech.speak('This is your current location.')}
                    //image={carMarker}
                    style={styles.locationStyle}
                    image={require('../images/car_icon.png')}
                />

                {this.state.markers.length !== 0 && this.getMarkers()}

            </MapView.Animated>

        );
    }
}

// const mapStateToProps = (state) => {
//     console.log(state);
//     return {
//         lat: state.loc.location.latitude,
//         lng: state.loc.location.longitude
//     }
// }





// const mapDispatchToProps = (dispatch) => {
//     return {

//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

export default MapContainer;
