import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Image,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {EyeVisibility} from './EyeVisibility';

const { height, width } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    EyeVisibility();

  //const [confirmPassword, setConfirmPassword] = useState(null);

  const forgotPassword = () => {
    if (email != '') {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert('The Email has been sent');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert('Please provide Email');
    }
  };

  async function accessAccount() {
    email === '' || password === ''
      ? alert('required filled missing')
      : firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            alert('Welcome to Bulletin24*7');
            navigation.replace('All');
            setEmail(null);
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
              marginTop: RFValue(40),
            }}
          />
          <Text
            style={{
              alignSelf: 'center',
              marginTop: RFValue(15),
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
              height: height / 2.7,
              margin: 10,
              marginTop: 40,
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
                alignSelf: 'center',
                marginTop: 10,
                color: '#A9D4FD',
              }}>
              LOGIN
            </Text>

            <Input
              containerStyle={{
                margin: 10,
              }}
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
              containerStyle={{
                margin: 10,
              }}
              placeholder="Password*"
              placeholderTextColor={'black'}
              value={password}
              onChangeText={(text) => setPassword(text)}
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

          <Pressable
            onPress={forgotPassword}
            style={{ alignSelf: 'flex-end', marginRight: 20, marginTop: 3 }}>
            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>
              Forgot Password?
            </Text>
          </Pressable>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={accessAccount}>
            <Text>LOGIN</Text>
          </TouchableOpacity>

          <Pressable
            onPress={() => navigation.navigate('Register')}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 4,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                marginBottom: 8,
                marginTop: 3,
              }}>
              Don't have an account? Sign up!
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
