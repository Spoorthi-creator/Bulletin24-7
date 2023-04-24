import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const { height, width } = Dimensions.get('window');
const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgb(255, 255, 255)' : 'rgb(190, 190, 190)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16, color: 'white' }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16, color: 'white' }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16, color: 'white' }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.replace('Login')}
      pages={[
        {
          backgroundColor: '#76a7c4',
          image: (
            <Image
              source={require('../assets/UI1.png')}
              resizeMode="cover"
              style={{ height: 400, width: width }}></Image>
          ),
          title: 'Bulletin24*7',
          subtitle: 'News is the first draft of history!',
        },
        {
          backgroundColor: '#76a7c4',
          image: (
            <Image
              source={require('../assets/UI2.png')}
              resizeMode="cover"
              style={{ height: 300, width: width }}></Image>
          ),
          title: 'Bulletin24*7',
          subtitle: 'Buy on the rumour, sell on the news!',
        },
        {
          backgroundColor: '#76a7c4',
          image: (
            <Image
              source={require('../assets/UI5.png')}
              resizeMode="cover"
              style={{ height: 500, width: width }}></Image>
          ),
          title: 'Bulletin24*7',
          subtitle: 'News is to the mind what sugar is to the body!',
        },
      ]}
    />
  );
};

export default OnboardingScreen;
