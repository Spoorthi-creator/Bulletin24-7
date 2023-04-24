import React, { useState, useEffect } from 'react';
import {
  View,
  Text
} from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default function LoadingScreen({ navigation }) {

  async function loading(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        navigation.navigate('All');
      }
      else{
        navigation.navigate('OnboardingScreen');
      }
    })
  }
 
 useEffect(() => {
    loading();
  }, []);

  return (
    <View style={{
      flex:1,
      backgroundColor:'white',
      //alignSelf:'center',
      alignItems:'center',
      justifyContent:'center',
    }}>
    <Text style={{
      //marginTop:150,
      fontSize:RFValue(15),
      color:'red',
      //fontWeight:'bold',
    }}>
    Loading...
    </Text>
    </View>
  )
 
}