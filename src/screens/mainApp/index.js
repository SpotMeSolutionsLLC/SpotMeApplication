// React dependencies
import React from "react";
import {
    View,
    Dimensions,
} from "react-native"

// Native modules
import MapView,{
    Marker
} from "react-native-maps"

// Other modules
import {
    SafeAreaView
} from "react-navigation"
import {
    connect
} from "react-redux"

// Local assets and dependencies
import {
    changeLocation
} from "SpotmeDetached/src/redux/actions/MapActions"

class MainApp extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <SafeAreaView>
                <MapView
                    pitchEnabled = {false}
                    showsCompass = {false}
                    provider = "google"
                    initialRegion = {this.props.coordinates}
                    style = {{
                        height: Dimensions.get("screen").height,
                        width: Dimensions.get("screen").width,
                        position: "absolute",
                        top: 0,
                        left: 0
                    }}
                >
                </MapView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    return {
        coordinates: state.MapReducer.coordinates
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeLocation: coordinates => {
            dispatch(changeLocation(coordinates));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);