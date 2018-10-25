

import React from "react";
import resolveAssetSource from "resolveAssetSource";
import {
  Image,
  Text
} from "react-native";


import Payment from './components/Payment';
import Favorite from './components/Favorite';
import History from './components/History';
import MapScreen from './components/MapScreen';
import MenuScreen from './components/MenuScreen';
import {createDrawerNavigator} from 'react-navigation';



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