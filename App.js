import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {PanGestureHandler, State} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { AntDesign } from '@expo/vector-icons'; 

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

    transX = cond(
      eq(this.gestureState, State.ACTIVE),
      add(this.offsetX, this.dragX),
      set(this.offsetX, this.offsetX)
    );

    transY = cond(
      eq(this.gestureState, State.ACTIVE),
      add(this.offsetY, this.dragY),
      set(this.offsetY, this.offsetY)
    );

    setOpacity = cond(eq(this.gestureState, State.BEGAN),
    0.1,
    1
    );
    

render(){

  return (
    <View>

    <Animated.Text style={[styles.message, { opacity: this.setOpacity}]}>
            <p>This is a cube drag it around</p>
            <AntDesign name="arrowdown" size={36} color="gray" />
          </Animated.Text>

        <PanGestureHandler maxPointers={1} onGestureEvent={this.onGestureEvent} onHandlerStateChange={this.onGestureEvent}>
           <Animated.View style={[styles.square, {transform: [{ translateX: this.transX}, { translateY: this.transY} ] }]} />
        </PanGestureHandler>

    </View>
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

  message: {
    fontSize: 30,
    textAlign: "center",
    color: "gray",
    marginTop: 200,
    marginBottom: -350,
  },

  square: {
    backgroundColor: '#58a39e',
    width: 75,
    height: 75,
  },
});
