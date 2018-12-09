import React, { Component } from 'react';
import {
    Animated
} from 'react-native';

import styles from './Styling.style.js';

//Used to display data chart 
class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: new Animated.Value(100)
        };
    }

    startAnimation() {
        //console.log('startAnimation Called');
        Animated.timing(this.state.top, { toValue: 200 }).start();
    }

    render() {
        return (
            //Displays view of data table
            <Animated.View 
                style={[{ top: this.state.top }, styles.dataTable.box]} 
            />
        );
    }

}

export default DataTable;
