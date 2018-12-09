import { createDrawerNavigator } from 'react-navigation';
import Payment from './components/Payment';
import Favorite from './components/Favorite';
import History from './components/History';
import MapScreen from './components/MapScreen';
import MenuScreen from './components/MenuScreen';
import Welcome from '../screens/Welcome';

//Allows users to navigate between different screens
const RouterComponent = createDrawerNavigator({
    Home: {
        path: '/',
        screen: MapScreen
    },
    Favorite: {
        path: '/sent',
        screen: Favorite
    },
    Payment: {
        path: '/sent',
        screen: MenuScreen
    },
    History: {
        path: '/sent',
        screen: MenuScreen
    },
    Settings: {
        path: '/sent',
        screen: MenuScreen
    },
    LogOut: {
        path: '/sent',
        screen: Welcome
    },
}, {
        initialRouteName: 'Home',
        drawerPosition: 'left',
        drawerWidth: 200,
        //drawerBackgroundColor: '#b2eae2',
        contentOptions: {
            activeBackgroundColor: '#b2eae2',
        }
    });

export default RouterComponent;
