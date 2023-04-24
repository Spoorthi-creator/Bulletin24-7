import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,LogBox} from 'react-native';
//import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from "./screens/OnboardingScreen";
import International from './screens/International';
import Sports from './screens/Sports';
import Business from './screens/Business';
import Tech from './screens/Tech';
import Health from './screens/Health';
import Science from './screens/Science';
import Entertainment from './screens/Entertainment';
import All from './screens/All';
import Register from './screens/Register';
import Login from './screens/Login';
import LoadingScreen from './screens/LoadingScreen';
import Recommended from './screens/Recommended';

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
 
]);
const Stack = createStackNavigator();
const StackNav = () => {
  return(
  <Stack.Navigator initialRouteName="LoadingScreen"  screenOptions={{
    headerShown: false,
    gestureEnabled: false
  }}>
    
    <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
     
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
   
    <Stack.Screen name="All" component={All}  options={{headerShown:false}}/>
    <Stack.Screen name="International" component={International} options={{headerShown:true}}/>
    <Stack.Screen name="Sports" component={Sports} options={{headerShown:true}}/>
    <Stack.Screen name="Business" component={Business} options={{headerShown:true}}/>
    <Stack.Screen name="Tech" component={Tech} options={{headerShown:true}}/>
    <Stack.Screen name="Health" component={Health}options={{headerShown:true}}/>
    <Stack.Screen name="Science" component={Science}options={{headerShown:true}}/>
    <Stack.Screen name="Entertainment" component={Entertainment}options={{headerShown:true}}/>
    <Stack.Screen name="Recommended" component={Recommended}options={{headerShown:true,title:'Favourites'}}/>
   
  </Stack.Navigator>)
}


export default function App() {
  return (
    <NavigationContainer>
    <StackNav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
