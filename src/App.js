import React, { Component } from 'react';
import { View, Text } from 'react-native';

//provider use to connect react to redux
// connect() methods in components use provider
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

//Components
import Payment from './components/Payment';
import Favorite from './components/Favorite';
import History from './components/History';
import MapScreen from './components/MapScreen';

//Router for navigating screens
import Router from './Router';
// import firebase from 'firebase';


const store = createStore(reducers, {}, applyMiddleware(thunk));

//var loaded = false;

class App extends Component {

    state = { isLoaded: false };

    async cacheRoutine() {
        const Font = Expo.Font;
        await Font.loadAsync({
            FontAwesome: require('../assets/fonts/FontAwesome.ttf'),
            //'Entypo' : require('../assets/fonts/Entypo.ttf'),
            EvilIcons: require('../assets/fonts/EvilIcons.ttf'),
            Feather: require('../assets/fonts/Foundation.ttf'),
            Ionicons: require('../assets/fonts/Ionicons.ttf'),
            MaterialCommunityIcons: require('../assets/fonts/MaterialCommunityIcons.ttf'),
            MaterialIcons: require('../assets/fonts/MaterialIcons.ttf'),
            Octicons: require('../assets/fonts/Octicons.ttf'),
            SimpleLineIcons: require('../assets/fonts/SimpleLineIcons.ttf'),
            Zocial: require('../assets/fonts/Zocial.ttf')
        });
    }

    //connect to firebase when app first started
    // componentWillMount() {
    //   const config = {
    //     apiKey: 'AIzaSyCA8Ywe9YFjWHSKuhB3NdNzgjtL1oICCOU',
    //     authDomain: 'spotme-5eeda.firebaseapp.com',
    //     databaseURL: 'https://spotme-5eeda.firebaseio.com',
    //     projectId: 'spotme-5eeda',
    //     storageBucket: 'spotme-5eeda.appspot.com',
    //     messagingSenderId: '457180824943'
    //   };
    //   firebase.initializeApp(config);
    // }

    componentDidMount() {

    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <Expo.AppLoading
                    startAsync={this.cacheRoutine}
                    onFinish={() => this.setState({ isLoaded: true })}

                    onError={console.warn}
                />);
        }

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
        //return null;
    }
}
export default App;
