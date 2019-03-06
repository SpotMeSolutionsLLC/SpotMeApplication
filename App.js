import React from 'react';
import { Font } from "expo";
import { Provider } from 'react-redux';
import store from './src/redux/index';
import MainApp from './src';
import OpenSans from "./assets/fonts/OpenSans.ttf"

class App extends React.Component {

    render() {
        return(
            <Provider store={store}>
                <MainApp />
            </Provider>
        );
    }

    componentDidMount(){
        Font.loadAsync({
            OpenSans: OpenSans
        })
    }
}

//remote the yellow // WARNING:

export default App;
