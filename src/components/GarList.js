import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    Dimensions,
    Animated,
    Image
} from 'react-native';
import axios from 'axios';

import {PerGarageInfo} from './PerGarageInfo';
import loadingImage from "../images/loading.gif"

const height = 150;
const borderRadius = 20;

let styles = {
    garageStyle: {
        borderBottomColor: 'blue',
        borderBottomWidth: 0.75,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 5,
        marginBottom: 5 + 20,
        height: height
    },
    headerContentStyles: {
        flexDirection: 'coloumn',
        justifyContent: 'space-around'
    },
    containerStyle: {
        backgroundColor: '#A0CFEC',
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        justifyContent: 'flex-start',
        position: "absolute",
        left:0,
        borderRadius: borderRadius
      },
};



class GarList extends Component {
    state = { 
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


    // componentDidMount() {
    //     this.updateData("SJNorth");
    //     // this.setState({
    //     //     parkingsName: "SJNorth",
    //     //     parkingsMax: 730,
    //     //     parkingsCurrent: 300,
    //     //     loaded:true
    //     // });

    // }

    updateData(searchName){
        console.log("Currently fetching data");
        axios.post('https://project-one-203604.appspot.com/garages/garage', {
            name: searchName
        }).then(res => {

            console.log('Found Garage Data: ' + searchName);



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
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: height
                }}>
                    <Image style={{
                        width:50,
                        height:50
                    }}
                    source={loadingImage}/>
                </View>
            )
        }
    }

    slideUp(searchName){
        this.updateData(searchName);
        Animated.timing(this.state.bottom,{
            toValue: -(styles.containerStyle.height - height),
            duration: 100
        }).start();
        
    }

    slideDown(){
        Animated.timing(this.state.bottom,{
            toValue: -(styles.containerStyle.height),
            duration: 100
        }).start();
        this.setState({
            loaded:false
        })
    }

    slideUpMore(){
        Animated.timing(this.state.bottom,{
            toValue: D
        })
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

