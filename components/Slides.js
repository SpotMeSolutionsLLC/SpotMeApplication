import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import TutImages from '../components/TutImages';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    scrollX = new Animated.Value(0);
//   renderLastSlide(index) {
//     if (index === this.props.data.length - 1) {
//       return (
//         <Button
//           title="Onwards!"
//           raised
//           buttonStyle={styles.buttonStyle}
//           onPress={this.props.onComplete}
//         />
//       );
//     }
//   }

  renderSlides = () => {
    return this.props.data.map(slide => {
      return (
        <View key={slide.text} style={ [styles.slideStyle, {backgroundColor: slide.color}]}>
          <TutImages image={slide.image} />
          <Text style={styles.textStyle}>{slide.text}</Text>
          <Text style={styles.subTextStyle}>{slide.subText}</Text>
        </View>
      );
    });
  }

  render() {

    let position = Animated.divide(this.scrollX, SCREEN_WIDTH);

    return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ScrollView
					horizontal
					style={{ flex: 1 }}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
            // the onScroll prop will pass a nativeEvent object to a function
          onScroll={Animated.event( // Animated.event returns a function that takes an array where the first element...
          	[{ nativeEvent: { contentOffset: { x: this.scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
          )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
            scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
				>
					{this.renderSlides()}
				</ScrollView>

				<View
          style={{ flexDirection: 'row', backgroundColor: '#EAF3FE', width: SCREEN_WIDTH, justifyContent: 'center'}} // this will layout our dots horizontally (row) instead of vertically (column)
          >
          {this.props.data.map((_, i) => { // the _ just means we won't use that parameter
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
              outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
              // inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index
              // outputRange: [0.3, 1, 1, 1, 0.3], // is when the opacity changes from 1 to 0.3
              extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
            });
            return (
              <Animated.View // we will animate the opacity of the dots so use Animated.View instead of View here
                key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                style={{ opacity, height: 10, width: 10, backgroundColor: '#1AE6CB', margin: 8, borderRadius: 5 }}
              />
            );
          })}
        </View>
			</View>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1AE6CB',
    marginTop: 20
  },
  subTextStyle: {
    fontSize: 18,
    marginHorizontal: 25,
    margin: 10,
    textAlign: 'center',
    color: '#1AE6CB',
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15
  }
};

export default Slides;