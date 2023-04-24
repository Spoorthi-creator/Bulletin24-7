import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet,TouchableOpacity,Pressable,FlatList } from 'react-native';
import { services } from '../services/service';
import {
  NativeBaseProvider,
  Divider,
  Image,
  Spinner,
 
} from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../Firebase';

export default function Science() {
  const [newsData, setNewsData] = useState([]);
  const [favourite,setFavourite]=useState('hearto')
  const[saveFav,setSaveFav]=useState(false)
  useEffect(() => {
    services('science')
      .then((data) => {
        setNewsData(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const getFavDetails = async () => {
    var docRef = db.collection("favourites").doc(firebase.auth().currentUser.uid);

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data().favScience);
        if(doc.data().favScience===false){
          setFavourite('heart')
        }
        else if(doc.data().favScience===true){
          setFavourite('hearto')
        }  
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
  }, [favourite]);

  async function favouriteVisibility () {
    if (favourite === 'heart') {
      setFavourite('hearto');
     
      setSaveFav(!saveFav);
      await db.collection("favourites").doc(firebase.auth().currentUser.uid).update({
        favScience:saveFav ,
       
       
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
   
    } else if (favourite === 'hearto') {
      setFavourite('heart');
   
      setSaveFav(!saveFav);
     await  db.collection("favourites").doc(firebase.auth().currentUser.uid).update({
      favScience:saveFav ,
       // userId: firebase.auth().currentUser.uid,
       
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        alert(error.message)
    });
     
    }
  }


  return (
    <NativeBaseProvider>
     
        {newsData.length > 1 ? (
          <View style={styles.newsCard}>
             <TouchableOpacity onPress={async () => {
                await favouriteVisibility();}} style={{alignItems:'flex-end',marginRight:10}}>
    <AntDesign name={favourite} size={26} color="red" />
        </TouchableOpacity>
            <FlatList
              data={newsData}
              renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                  <Image
                    width={null}
                    height={400}
                    resizeMode={'cover'}
                    source={{
                      uri: item.urlToImage,
                    }}
                    alt="Alternate Text"
                  />
                  <View>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.date}>
                      {moment(item.publishedAt).format('LLLL')}
                    </Text>
                    <Text style={styles.descriptionText}>
                      {item.description}
                    </Text>
                    <Pressable
                      onPress={() => WebBrowser.openBrowserAsync(item.url)}>
                      <Text style={styles.readMoreText}>Read more...</Text>
                    </Pressable>
                  </View>
                  <Divider my={5} bg="#000" />
                </View>
              )}
              keyExtractor={(item,index) => item.id}
            />
          </View>
        ) : (
          <View style={styles.spinner}>
            <Spinner color="danger.400" />
          </View>
        )}
     
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: RFValue(13),
  },
  date: {
    color: '#076da1',
    fontSize: RFValue(11),
  },
  descriptionText: {
    //marginBottom:10
    fontSize: RFValue(12),
  },
  readMoreText: {
    color: '#076da1',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: RFValue(12),
  },
  cardContainer: {
    flex: 0.85,
    margin: RFValue(10),
    borderRadius: RFValue(5),
    //borderWidth:2,
    padding: 10,
    backgroundColor: '#ECECEA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newsCard: {
    backgroundColor: '#76a7c4',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
  },
});
