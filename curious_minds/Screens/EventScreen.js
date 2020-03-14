import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  LayoutAnimation,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';


function EventScreen({navigation}) {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Text>Events!</Text>
   </View>
 );
}

export default EventScreen;
