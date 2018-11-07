import React, {Component} from "react";
import { Text, View, Image, Button, Dimensions} from "react-native";

class Profile extends Component{
	static navigationOptions ={
		drawerIcon:(
			<Image source ={ require("../images/profile2.png")}/>
		)
	}
	render(){
		return(
			<View style={styles.containerStyle}>

		    	<View style={styles.imageStyle}>
			        <Button
			          onPress={() => this.props.navigation.openDrawer()}
			          title="Back"
			        />
			        <Text style={styles.headerText}>Profile </Text>
					<Image source={require("../images/profile2.png")}/>
				</View>
				<View style ={styles.imageStyle}>
					<Image source={require("../images/profile3.png")}/>
				</View>
		        <View>
		        	<Text style={styles.detailText}>Name: Chris</Text>
		        	<Text style={styles.detailText}>Phone number: 408-123-**** </Text>
		        </View>
		    </View>

		)
	}
}
const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: "#EBEEF5",
    flexDirection: "column",
    justifyContent: "flex-start",
    width:Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  imageStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:15
  },
  garageNameStyle: {
    flex: 0,
    flexDirection: "row"
  },
  headerStyle: {
    margin: 30,
    flexDirection: "row"
  },
  detailStyleLeftColumn: {
    width: 150,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10
  },
  detailStyleRightColumn: {
    width: 150,
    margin: 10
  },
  headerText: {
    fontFamily: 'Avenir Next Condensed',
      fontSize: 30,
      color: "black",
      fontWeight: "900"

  },
  detailText: {
    fontSize: 20,
		alignItems: 'center'
  },
  subHeaderText: {
    fontFamily: 'Avenir Next Condensed',
    fontSize: 25,
    textDecorationLine: "underline"
  }
};
export default Profile;
