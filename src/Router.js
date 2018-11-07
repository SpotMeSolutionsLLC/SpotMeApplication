import { createDrawerNavigator } from 'react-navigation';

import Payment from './components/Payment';
import Favorite from './components/Favorite';
import History from './components/History';
import MapScreen from './components/MapScreen';
import MenuScreen from './components/MenuScreen';


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
    screen: Payment
  },
  History: {
    path: '/sent',
    screen: History
  },
  Settings: {
    path: '/sent',
    screen: MenuScreen
  },
  LogOut: {
    path: '/sent',
    screen: MenuScreen
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

/*
import React from "react";
import resolveAssetSource from "resolveAssetSource";
import {
  Image,
  Text
} from "react-native";
*/
/*
import Favorite from './components/Favorite';
import History from './components/History';
import MapScreen from './components/MapScreen';
import Menu from './components/Menu';
//import SearchBar from "./components/SearchBar";
import LoginPage from './components/LoginPage';
import {
  DrawerNavigator
} from 'react-navigation';

const RouterComponent = DrawerNavigator({
  Home: {
    path: '/',
    screen: LoginPage
  },
  MapScreen: {
    path: '/',
    screen: MapScreen
  },
  Profile: {
    path: '/',
    screen: Menu
  },
  Favorite: {
    path: '/sent',
    screen: Favorite
  },
  Recent: {
    path: '/sent',
    screen: History
  },
  Account: {
    path: '/sent',
    screen: Menu
  },
  LogOut: {
    path: '/sent',
    screen: Menu
  },
  GarageInfo: {
     path: '/sent',
     screen: Menu
   },
}, {
  initialRouteName: 'Home',
  drawerPosition: 'left',
  drawerWidth: 200,
  contentOptions: {
    activeBackgroundColor: '#b2eae2'
  }
});

export default RouterComponent;
*/
