import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    Dimensions,
    Animated
} from 'react-native';
import axios from 'axios';

import {PerGarageInfo} from './PerGarageInfo';

let styles = {
    garageStyle: {
      borderBottomColor: 'blue',
      borderBottomWidth: 0.75,
      marginLeft: 25,
      marginRight: 25,
      marginTop: 5,
      marginBottom: 5
    },
    headerContentStyles: {
        flexDirection: 'coloumn',
        justifyContent: 'space-around'
    },
    containerStyle: {
        backgroundColor: '#A0CFEC',
        height: 150,
        width: Dimensions.get("window").width,
        justifyContent: 'center',
        position: "absolute",
        left:0,
      },
};


class GarList extends Component {
    state = { 
        whichGarage: 'SJNorth',
        parkingsName: '',
        parkingsMax: 0,
        parkingsCurrent: 0,
        loaded: false,
        bottom: new Animated.Value(-styles.containerStyle.height)

    };

    constructor(props){
        super(props);
        console.log(this.state.bottom);
        
        this.slideUp = this.slideUp.bind(this);
        this.slideDown = this.slideDown.bind(this);
    }


    componentDidMount() {
      
        console.log("Currently fetching data");
        axios.post('https://project-one-203604.appspot.com/garages/garage', {
            name: this.state.whichGarage
        }).then(res => {

            console.log('Type is: ');



            this.setState({
                parkingsName: res.data.name,
                parkingsMax: res.data.max,
                parkingsCurrent: res.data.current,
                loaded:true
            }, function(){
                console.log("State has changed");
            });

         });
    }

    whenDoneLoading(){
        console.log("WhenDoneLoading");
        if(this.state.loaded){
            console.log("PerGarageInfo Loaded");
            return(
                <PerGarageInfo
                        spotsNum={this.state.parkingsCurrent} 
                        garageName={this.state.parkingsName}
                        garageMax={this.state.parkingsMax}
                />
            );
        }
        else{
            return(
                <View>
                    <Text>
                        Did not load yet
                    </Text>
                </View>
            )
        }
    }

    slideUp(){
        Animated.timing(this.state.bottom,{
            toValue: 0,
            duration: 100
        }).start();
    }

    slideDown(){
        Animated.timing(this.state.bottom,{
            toValue: -styles.containerStyle.height,
            duration: 100
        }).start();
    }


    render() {
        let {bottom} = this.state;
        return (
            <Animated.View style={[styles.containerStyle,{bottom: bottom}]}>
                <View style={styles.garageStyle}>
                    {this.whenDoneLoading()}
                    
                </View>
            </Animated.View>
        )

    }
}



export default GarList;

