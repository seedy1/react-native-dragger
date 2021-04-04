import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {PanGestureHandler, State} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const {width, height} = Dimensions.get("screen");
const { event, Value, cond, eq, add, set, sub} = Animated;


export default class App extends React.Component{


  dragX = new Value(0);
  dragY = new Value(0);
  offsetX = new Value(width / 2);
  offsetY = new Value(height / 2);
  gestureState = new Value(-1);
    // this.translate = new Animated.ValueXY();

    onGestureEvent = event([
      {
        nativeEvent: {
          translationX: this.dragX,
        translationY: this.dragY,
        state: this.gestureState,
        }
      }
    ]);

    // dragX = cond( eq(this.state, State.ACTIVE), add(this.beginX, this.translateX), set(this.beginX) );
    // dragY = cond( eq(this.state, State.ACTIVE), add(this.beginY, this.translateY), set(this.beginY) );
    transX = cond(
      eq(this.gestureState, State.ACTIVE),
      add(this.offsetX, this.dragX),
      set(this.offsetX, add(this.offsetX, this.dragX))
    );

    transY = cond(
      eq(this.gestureState, State.ACTIVE),
      add(this.offsetY, this.dragY),
      set(this.offsetY, add(this.offsetY, this.dragY))
    );
    

render(){

  return (
    // <View style={styles.container}>
        <PanGestureHandler maxPointers={1} onGestureEvent={this.onGestureEvent} onHandlerStateChange={this.onGestureEvent}>
           <Animated.View style={[styles.square, {transform: [{ translateX: this.transX}, { translateY: this.transY} ] }]} />

        </PanGestureHandler>
        // <StatusBar style="auto" />
    // </View>
    );  
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  square: {
    backgroundColor: '#58a39e',
    width: 75,
    height: 75,
  },
});
