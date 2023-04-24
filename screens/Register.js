import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Image
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Input } from 'react-native-elements';
import {
  signInWithEmailAndPassword,
  auth,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from '../Firebase';
import firebase from 'firebase';
import db from '../Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {EyeVisibility} from './EyeVisibility';

const { height } = Dimensions.get('window');

export default function Register({ navigation }) {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    EyeVisibility();
    
  //const [confirmPassword, setConfirmPassword] = useState(null);

  async function createAccount() {
   name===''|| email === '' || password === ''
      ? alert('Required filled missing')
      : await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            db.collection('users')
              .add({
                name: name,
                email: email,
                uid: firebase.auth().currentUser.uid,
               
              })
              .then((docRef) => {
                console.log('Document written with ID: ', docRef.id);
              })
              .catch((error) => {
                console.error('Error adding document: ', error);
              });

               db.collection("favourites").doc(firebase.auth().currentUser.uid).set({
                notification:'',
                favSport:true,
                favBusiness:true,
                favEntertainment:true,
                favHealth:true,
                favScience:true,
                favTech:true,
                favInternational:true
              })

            alert('Welcome to Bulletin24*7');
            navigation.replace('All');
            setEmail(null);
            setName(null);
            setPassword(null);
            //setConfirmPassword(null);
          })
          .catch((error) => {
            alert(error.message);
          });
  }

  return (
    <View style={styles.page}>
      <SafeAreaView>
        <KeyboardAwareScrollView>
          <Image
            source={require('../assets/icon.png')}
            resizeMode="cover"
            style={{
              height: 170,
              width: 170,
              alignSelf: 'center',
              marginTop: RFValue(30),
            }}
          />
          <Text
            style={{
              alignSelf: 'center',
              marginTop: RFValue(10),
              fontSize: 30,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Bulletin24*7
          </Text>
          <View
            style={{
              borderRadius: 50,
              backgroundColor: 'white',
              justifyContent: 'center',
              height: height / 2.15,
              margin:RFValue(10),
              //marginTop: 0,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginLeft: 15,
               // marginTop: 20,
                color: '#A9D4FD',
                alignSelf: 'center',
              }}>
              CREATE ACCOUNT
            </Text>

            <Input
              // containerStyle={{
              //   margin: 10,
              // }}
              placeholder="Name*"
              placeholderTextColor={'black'}
              value={name}
              onChangeText={(text) => setName(text)}
              leftIcon={
                <Ionicons name="person-outline" size={16} color="black" />
              }
            />

            <Input
              // containerStyle={{
              //   margin: 10,
              // }}
              placeholder="Email*"
              placeholderTextColor={'black'}
              value={email}
              onChangeText={(text) => setEmail(text)}
              leftIcon={
                <MaterialCommunityIcons
                  name="email-outline"
                  size={16}
                  color="black"
                />
              }
            />

            <Input
              // containerStyle={{
              //   margin: 10,
              // }}
              placeholder="Password*"
              placeholderTextColor={'black'}
              value={password}
              onChangeText={(value) => setPassword(value)}
              leftIcon={<Icon name="key" size={16} color="black" />}
              secureTextEntry={passwordVisibility}
              enablesReturnKeyAutomatically
              rightIcon={
                <Pressable onPress={handlePasswordVisibility}
                style={{marginRight:8}}>
                  <MaterialCommunityIcons
                    name={rightIcon}
                    size={22}
                    color="#232323"
                  />
                </Pressable>
              }
            />
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={createAccount}>
            <Text>SIGN UP</Text>
          </TouchableOpacity>

          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 4,
            }}>
            <Text style={{ fontSize: 16, color: 'white', marginBottom:8, marginTop:3 }}>
              Already have an account? Sign in!
            </Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(20),
    fontSize: RFValue(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
  page: {
    backgroundColor: '#76a7c4',
    height: '100%',
  },
});
