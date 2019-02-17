import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/index';
import MainApp from './src';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Provider store={store}>
                <MainApp />
            </Provider>
        );
    }
}

//remote the yellow // WARNING:
console.disableYellowBox = true;

export default App;
