import React, {Component} from "react";
import { Text, View, Image, Button } from "react-native";
class History extends Component {
  render(){

  return (
    
    <View style={styles.containerStyle}>
    <View style={styles.imageStyle}>
    <Button
    onPress={() => this.props.navigation.openDrawer()}
    title='back'
    />
    <Text style={styles.headerText}>Recently Searched </Text>

      <Image
        source={require("../images/icon.jpg")}
      />
    </View>

      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.subHeaderText}>Name</Text>
        </View>

        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.subHeaderText}>Slots</Text>
        </View>
       
        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.subHeaderText}>Price</Text>
        </View>
      </View>

      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.detailText}>Santa Clara</Text>
        </View>
        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.detailText}>120/250</Text>
        </View>
      
      <View style={styles.detailStyleRightColumn}>
      <Text style={styles.detailText}>$8/hr</Text>
    </View>
      </View>

      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.detailText}>San Jose</Text>
        </View>
        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.detailText}>100/200</Text>
        </View>
      
      <View style={styles.detailStyleRightColumn}>
      <Text style={styles.detailText}>$10/hr</Text>
    </View>
      </View>

      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.detailText}>SF</Text>
        </View>
        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.detailText}>220/350</Text>
        </View>
      
      <View style={styles.detailStyleRightColumn}>
      <Text style={styles.detailText}>$15/hr</Text>
    </View>
      </View>
    </View>

  );
}
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',    
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  garageNameStyle: {
    flexDirection: "row"
  },
  imageStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15
  },
  headerStyle: {
    margin: 10,
    flexDirection: "row"
  },
  detailStyleLeftColumn: {
    width: 110,
    marginLeft: 40,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5
  },
  detailStyleRightColumn: {
    width: 110,
    margin: 5
  },
  headerText: {
    fontSize: 30,
    color: "#379b8c",
    fontWeight: "900"
  },
  detailText: {
    fontSize: 20

  },
  subHeaderText: {
    fontSize: 25,
    textDecorationLine: "underline"
  }
};
export default History;
