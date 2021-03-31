import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import {PanGestureHandler, State} from "react-native-gesture-handler";

export default class App extends React.Component{

  constructor(){
    super();
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    // this.translate = new Animated.ValueXY();

    this.onGestureEvent = Animated.event([
      {
        nativeEvent: {
          translationX: this.translateX,
          translationY: this.translateY,
        }
      }
    ]);

  
    // this.onHandlerStateChange = Animated.event([
    //   {
    //     nativeEvent: {
    //       translationX: this.translateX.extractOffset(),
    //       translationY: this.translateY.extractOffset(),
    //     }
    //   }
    // ]);


    
  }


render(){

  return (
    <View style={styles.container}>
        <PanGestureHandler onGestureEvent={this.onGestureEvent}>
           <Animated.View style={[styles.square, {transform: [{ translateX: this.translateX}, { translateY: this.translateY} ] }]} />
        </PanGestureHandler>
        <StatusBar style="auto" />
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

  square: {
    backgroundColor: '#2e8b57',
    width: 75,
    height: 75,
  },
});
