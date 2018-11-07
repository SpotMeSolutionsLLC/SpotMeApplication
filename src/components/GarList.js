import React, {Component} from 'react';
import {View,Text} from 'react-native';
import axios from 'axios';
import GarDetail from './GarDetail';
import {PerGarageInfo} from './PerGarageInfo';


class GarList extends Component {
    constructor(props){
        super(props);
        this.state = {
            parkings: []
        };
    }


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
        <View style={styles.viewBox}>
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
    viewBox:{
        top:0,
        height:400,
        
    }
};
export default GarList;