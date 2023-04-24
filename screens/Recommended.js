import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../Firebase';




const { height, width } = Dimensions.get('window');

export default function Recommended({ navigation }) {
    const[sports,setSports]=useState(true);
    const[business,setBusiness]=useState(true);
    const[enter,setEnter]=useState(true);
    const[health,setHealth]=useState(true);
    const[inter,setInter]=useState(true);
    const[science,setScience]=useState(true);
    const[tech,setTech]=useState(true);


    const getFavDetails = async () => {
        var docRef = db.collection("favourites").doc(firebase.auth().currentUser.uid);
    
        docRef.get().then((doc) => {
          if (doc.exists) {
           // console.log("Inter data:", doc.data().favInternational);
            setSports(doc.data().favSport)
            setBusiness(doc.data().favBusiness)
            setEnter(doc.data().favEntertainment)
            setHealth(doc.data().favHealth)
            setInter(doc.data().favInternational)
            setScience(doc.data().favScience)
            setTech(doc.data().favTech)
    
          } else {
    
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
          alert("Somthing went wrong! Please try again")
        });
    
      };

      useEffect(() => {
      
        getFavDetails();
      }, []);

      return (
        <ScrollView style={{height:height,backgroundColor:'#76a7c4'}}>

            <View style={styles.iconsContainer}>
             
                { inter===false?(
                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('International')}>
                  <Image
                    source={require('../assets/international.png')}
                    style={{
                      height: 100,
                      width: 100,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center', marginLeft: 5 }}>
                    International
                  </Text>
                </TouchableOpacity>):''}


{sports===false?(
                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Sports')}>
                  <Image
                    source={require('../assets/sports.png')}
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Sports</Text>
                </TouchableOpacity>):''}


{business===false?(
                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Business')}>
                  <Image
                    source={require('../assets/business.png')}
                    style={{
                      height: 90,
                      width: 90,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Business</Text>
                </TouchableOpacity>):''}

                {tech===false?(
                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Tech')}>
                  <Image
                    source={require('../assets/tech.png')}
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Technology</Text>
                </TouchableOpacity>):''}

                {health===false?(
                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Health')}>
                  <Image
                    source={require('../assets/health.png')}
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Health</Text>
                </TouchableOpacity>):''}

                {science===false?(
                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Science')}>
                  <Image
                    source={require('../assets/science.png')}
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Science</Text>
                </TouchableOpacity>):''}

                {enter===false?(
                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Entertainment')}>
                  <Image
                    source={require('../assets/entertainment.png')}
                    style={{
                      height: 80,
                      width: 80,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center', marginRight: 5 }}>
                    Entertainment
                  </Text>
                </TouchableOpacity>):''}

              </View>
              </ScrollView>
             

      );
}

const styles = StyleSheet.create({
    iconsContainer: {
        borderTopLeftRadius: RFValue(10),
        borderTopRightRadius: RFValue(10),
        borderBottomLeftRadius:RFValue(10),
        borderBottomRightRadius:RFValue(10),
        backgroundColor: 'white',
        margin:10,
      },
})