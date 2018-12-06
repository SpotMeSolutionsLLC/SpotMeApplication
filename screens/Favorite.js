import React,{Component} from "react";
import { Text, View, Image, Button, Dimensions } from "react-native";
//Lukes was here
class Favorite extends Component{
  static navigationOptions = {
    drawerIcon:(
      <Image source={require("../images/favorite.png")}/>
    )
  }
render(){
  return (
    <View style={styles.containerStyle}>

      <View style={styles.imageStyle}>
        <Button
          //onPress={() => this.props.navigation.navigate('DrawerOpen')}
          onPress={() => this.props.navigation.openDrawer()}
          title="Back"
        />
        <Text style={styles.headerText}>Favorite </Text>
        <Image source={require("../images/favorite.png")}/>
      </View>


      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.subHeaderText}>Garage</Text>
        </View>

        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.subHeaderText}>Floor</Text>
        </View>
        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.subHeaderText}>Time</Text>
        </View>

      </View>

      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.detailText}>SJSU North Parking</Text>
        </View>
        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.detailText}>1st </Text>
          <Text style={styles.detailText}>2nd </Text>
          <Text style={styles.detailText}>3rd </Text>
          <Text style={styles.detailText}>4th </Text>
          <Text style={styles.detailText}>5th </Text>
          <Text style={styles.detailText}>6th </Text>
        </View>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.detailText}>7:30 AM </Text>
          <Text style={styles.detailText}>8:13 AM </Text>
          <Text style={styles.detailText}>7:32 AM </Text>
          <Text style={styles.detailText}>7:35 AM </Text>
          <Text style={styles.detailText}>8:03 AM </Text>
          <Text style={styles.detailText}>8:50 AM </Text>
        </View>

      </View>

      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.detailText}>SJSU West Parking</Text>
        </View>
        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.detailText}>50/200</Text>
        </View>
      </View>

      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.detailText}>SJSU South Parking</Text>
        </View>
        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.detailText}>80/150</Text>
        </View>
      </View>
    </View>
  );
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
    //fontFamily: 'Avenir Next Condensed',
    fontSize: 20
  },
  subHeaderText: {
    fontFamily: 'Avenir Next Condensed',
    fontSize: 25,
    textDecorationLine: "underline"
  }
};
export default Favorite;
