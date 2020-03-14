import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  LayoutAnimation,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

var state = {
  Code: '',
};
var handleCode = text => {
  state.Code = text;
};

function PastorSecCodeScreen({navigation}) {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
       resetScrollToCoords={{x: 0, y: 0}}
       contentContainerStyle={styles.container}
       scrollEnabled={false}
       extraHeight={100}
       >
          <View style={styles.logo}>
            <Image source={require('../images/logo_placeholder.png')} />
          </View>
          <View>
            <Text style={styles.securityCodeText}>Pastors{"\n"}Security Code</Text>
          </View>
          <View style = {{alignItems: 'center'}}>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Code Here"
              //NEED TO MAKE SURE THE KEYBOARD DOESN'T COVER THE BOX
              placeholderTextColor="white"
              onChangeText={handleCode}
            />
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => navigation.navigate('Pastor SignUp')}>
              <Text style={styles.customBtnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
    alignItems: 'center',
  },
  logo: {
    margin: 100,
  },
  inputBox: {
    //borderRadius: 30,
    //borderColor: 'white',
    //borderWidth: 1,
    borderBottomWidth: 1.0,
    width: 250,
    textAlign: 'center',
    marginTop: 50,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 5, width: 5}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 25,
    width: 150,
    //margin: 10,
    marginTop: 25,
  },
  customBtnText: {
    fontSize: 35,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
  securityCodeText: {
    fontSize: 35,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
});

export default PastorSecCodeScreen;
