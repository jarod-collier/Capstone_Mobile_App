import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  LayoutAnimation,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

function ProfileScreen({navigation}) {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Text>Profile Screen!</Text>
   </View>
 );
}

export default ProfileScreen;
