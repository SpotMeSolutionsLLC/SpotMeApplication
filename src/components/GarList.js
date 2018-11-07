import React, {Component} from 'react';
import {View,Text} from 'react-native';
import axios from 'axios';
import GarDetail from './GarDetail';
import {PerGarageInfo} from './PerGarageInfo';


class GarList extends Component {
    state = {
        parkings: []
    };


    componentWillMount() {

        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            const parkings = res.data;
            this.setState({ parkings });
          })
            //.then(response => console.log(response));
            //.then(response => this.setState({parkings: response.data}));

    }


    renderParkings(){
        return this.state.parkings.map(parking =>
            <GarDetail key={parking.title} parking = {parking} />

        );

    }

    render() {
     return(
      <View>
          {this.renderParkings()}

       </View>
      );
    }


  //   renderit(){
  //
	// for(let i = 0; i < noGuest; i++){
  //
	// 	parkings.get(
	// 		<View key = {i}>
	// 			parkings
	// 		</View>
	// 	)
	// }



    }



const styles = {
    garageStyle: {
      borderBottomColor: 'blue',
      borderBottomWidth: 0.75,
      marginLeft: 25,
      marginRight: 25,
      marginTop: 5,
      marginBottom: 5
    },
    containerStyle: {
      backgroundColor: '#00FFFF',
      height: 300,
      width: 325,
      borderRadius: 15,
      marginLeft: 25,
      marginRight: 25,
      marginTop: 200,
      marginBottom: 35,
      justifyContent: 'center'
    },
  };

export default GarList;
