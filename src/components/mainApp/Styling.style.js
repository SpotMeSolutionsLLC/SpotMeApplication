//Styling for all of the js classes
import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const garListHeight = 150;
const borderRadius = 20;
const markerSize = {
    height: 40,
    width: 40
};

export const favoriteStyle = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height

    },
    imageStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    garageNameStyle: {
        flex: 0,
        flexDirection: 'row'
    },
    headerStyle: {
        margin: 30,
        flexDirection: 'row'
    },
    detailStyleLeftColumn: {
        width: 150,
        marginLeft: 40,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10
    },
    detailStyleRightColumn: {
        width: 150,
        margin: 10
    },
    headerText: {
        fontSize: 30,
        color: '#379b8c',
        fontWeight: '900'
    },
    detailText: {
        fontSize: 20
    },
    subHeaderText: {
        fontSize: 25,
        textDecorationLine: 'underline'
    }
})

export const garList = StyleSheet.create({
    height: garListHeight,

    garageStyle: {
        borderBottomColor: 'blue',
        borderBottomWidth: 0.75,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 5,
        marginBottom: 5 + 20,
        height: garListHeight
    },
    headerContentStyles: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    containerStyle: {
        backgroundColor: '#A0CFEC',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'flex-start',
        position: 'absolute',
        left: 0,
        borderRadius
    },
});

export const MapContainerStyles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerStyle: {
        width: markerSize.width,
        height: markerSize.height
    },
    markerStyleImage: {
        zIndex: 98,
        width: markerSize.width,
        height: markerSize.height
    },
    locationStyle: {
        zIndex: 99
    },
    callOut: {
        justifyContent: 'flex-start',
    },
})

export const MapScreenStyles = StyleSheet.create({
    gestureZone: {
        position: 'absolute',
        backgroundColor: 'transparent',
        left: 0,
        width: 40,
        height: Dimensions.get('window').height
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: Platform.OS === 'android' ? 30 : 0,
    },
    menuButton: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        bottom: 30,
        zIndex: 99,
        width: '15%',
        height: 50
    },
    menuButtonImage: {
        height: 30,
        width: 30,
        opacity: .5
    }
})

export const GarageInfoContainerStyles = StyleSheet.create({

});

export const GarageInfoStyles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        marginLeft: 7,
        marginRight: 7,
        marginTop: 10,
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftSectionStyle: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        width: '20%',

    },
    rightSectionStyle: {
        flexDirection: 'column',
        flex: 1,
        width: '20%',
        height: '100%'
    },
    generalStyle: {
        marginTop: 2,
        marginBottom: 2,
    },
    textStyle: {
        justifyContent: 'center',
        fontSize: 40,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 40,
        fontWeight: '900',
        borderColor: 'black',
        borderWidth: 4,
        height: 100,
        width: 150,
        overflow: 'hidden',
        lineHeight: 100,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10
    },
    favoButton: {
        backgroundColor: 'blue',
        padding: 10
    }
})

export const GoogleSearchStyles = StyleSheet.create({
    input: {
        height: 50,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20

    },
    inputContainer: {
        position: 'absolute',
    },
    scroll: {
        backgroundColor: 'white',
        top: 0
    },
    listView: {

        height: 50,
        justifyContent: 'center',
        borderTopColor: 'black',
        borderTopWidth: 1
    },
    listViewText: {
        paddingLeft: 20,
        paddingRight: 20,
    }
})
