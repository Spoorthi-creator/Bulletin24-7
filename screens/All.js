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
  ScrollView
} from 'react-native';
import { services } from '../services/service';
import { NativeBaseProvider, FlatList, Image, Spinner } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../Firebase';
import * as WebBrowser from 'expo-web-browser';
import { MaterialIcons } from '@expo/vector-icons';



const { height, width } = Dimensions.get('window');

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function All({ navigation }) {
  const [newsData, setNewsData] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [notVisibility, setNotVisibility] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [userName, setUserName] = useState(null);
  const [bell, setBell] = useState('bell-o');
  


  const getNotificationDetails = async () => {
    var docRef = db.collection("favourites").doc(firebase.auth().currentUser.uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        if (doc.data().notification === false) {
          setBell('bell-slash-o')
        }
        else if (doc.data().notification === true) {
          setBell('bell-o')
        }


      } else {

        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
      alert("Somthing went wrong! Please try again")
    });

  };

  const getUserDetails = async () => {
    db.collection('users')
      .where('uid', '==', firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setUserName(doc.data().name);

        });
      });
  }

  useEffect(() => {
    getUserDetails();
    getNotificationDetails();
   // getFavDetails();
  }, []);

  async function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert('You have successfully signed out.');
        navigation.replace('OnboardingScreen');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  async function sendPushNotification(expoPushToken) {
    if (bell === 'bell-o') {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Bulletin24*7',
          body: "Did you check what's happening today!?",
          data: {},
        },
        trigger: { hour: 9, minute: 0, repeats: true },
      });
      alert('You have successfully subscribed for notifications');
      setBell('bell-slash-o');
      setNotVisibility(true);
      db.collection("favourites").doc(firebase.auth().currentUser.uid).update({
        notification: notVisibility,


      })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else if (bell === 'bell-slash-o') {
      Notifications.cancelAllScheduledNotificationsAsync();
      alert('You have successfully unsubscribed for notifications');
      setBell('bell-o');
      setNotVisibility(false);
      db.collection("favourites").doc(firebase.auth().currentUser.uid).update({
        notification: notVisibility,
      })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  }



  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    services('general')
      .then((data) => {
        setNewsData(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <NativeBaseProvider>
      {newsData.length > 1 ? (
        <ScrollView style={{ height: height }}>
          <View style={styles.newsCard}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                //marginTop:10,
                padding: 5,
                borderTopRightRadius: RFValue(20),
                borderTopLeftRadius: RFValue(20),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 25,
                  color: 'black',
                  fontWeight: 'bold',
                  margin: 5,
                  //marginTop: 15,
                  padding: 3,
                }}>
                Hello {userName}!
              </Text>
              <TouchableOpacity
                style={{
                  margin: 5,
                 // marginTop: 15,
                  padding: 3,

                }}
                onPress={async () => {
                  await sendPushNotification(expoPushToken);
                }}>
                <FontAwesome name={bell} size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>

              <Text
                style={{
                  margin: 10,
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Headlines
              </Text>
              <TouchableOpacity
                style={{
                  margin: 10,
                }}
                onPress={logout}>
                <MaterialIcons name="logout" size={29} color="white" />
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={newsData}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                  <Image
                    width={300}
                    height={200}
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
                    <Text style={styles.descriptionText}>{item.description}</Text>
                    <Pressable
                      onPress={() => WebBrowser.openBrowserAsync(item.url)}>
                      <Text style={styles.readMoreText}>Read more...</Text>
                    </Pressable>
                  </View>
                </View>
              )}

            />

            <Text
              style={{
                margin: 10,
                fontSize: 23,
                color: 'white',
                fontWeight: 'bold',
              }}>
              Explore
            </Text>

            <View style={styles.iconsContainer}>
              <ScrollView horizontal>
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
                      height: 60,
                      width: 60,
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
                </TouchableOpacity>

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
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Sports</Text>
                </TouchableOpacity>

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
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Business</Text>
                </TouchableOpacity>

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
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Technology</Text>
                </TouchableOpacity>

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
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Health</Text>
                </TouchableOpacity>

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
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Science</Text>
                </TouchableOpacity>

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
                      height: 60,
                      width: 60,
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
                </TouchableOpacity>
              </ScrollView>
            </View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>

            <Text
              style={{
                margin: 15,
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
                
              }}>
             Check Out Your Favourites!
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Recommended')} style={{alignItems:'center',alignSelf:'center'}} >
              <Image source={require('../assets/favorites-heart-icon.png')} style={{height:40,width:40,margin:5}} alt="Alternate Text"></Image>
              {/* <Text style={{
                width:280,
                margin: 15,
                fontSize: 20,
                backgroundColor:'white',
                color: '#076da1',
                fontWeight: 'bold',
                alignSelf:'center',

                borderRadius:10,
                
              }}></Text> */}
            </TouchableOpacity>
            </View>
            
            
          </View>
        </ScrollView>
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
    //margin: 20,
    width: 300,
   // height: height,
    //borderRadius: 30,
    marginLeft: RFValue(5),
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
    height:height,
    flex:1,

    // borderRadius:10,
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
  },
  iconsContainer: {
    borderTopLeftRadius: RFValue(10),
    borderTopRightRadius: RFValue(10),
    borderBottomLeftRadius:RFValue(10),
    borderBottomRightRadius:RFValue(10),
    backgroundColor: 'white',
  },
});
