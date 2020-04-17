import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { db } from '../FireDatabase/config';
import firebase from 'firebase';
import { useFocusEffect } from '@react-navigation/native';

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
  Alert,
} from 'react-native';


// const handleCode = text => {
//   state.Code = text;
// };

// useFocusEffect(
//   React.useCallback(() => {
//     // Do something when the screen is focused
//     return () => {
//       // Do something when the screen is unfocused
//       clearCode.current.clear();
//     };
//   }, [])
// );

export default class PastorSecCodeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Code: "",
    };

    this.clearCode = React.createRef();
  }

  async readFromDB(){
    let found = false;
    await db.ref('/userInfo/').once('value', function(snapshot){
      snapshot.forEach((child) => {
        if(child.val().userType === 'pastor'){
          if(child.val().pastorCode === this.state.Code){
            found = true;
          }
        }
      })
    }.bind(this));
    return found;
  }

  async validateCode(navigation){
    var valid = await this.readFromDB();
    if(valid){
      navigation.navigate('Pastor SignUp');
    }else{
      Alert.alert('Not a valid security code.\nPlease try again.');
    }
  }
  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
         resetScrollToCoords={{x: 0, y: 0}}
         contentContainerStyle={styles.container}
         scrollEnabled={false}
         extraHeight={100}
         >
            <View style={styles.logo}>
              <Image source={require('../images/CM_logo02.png')} />
            </View>
            <View>
              <Text style={styles.securityCodeText}>Pastors{"\n"}Security Code</Text>
            </View>
            <View style = {{alignItems: 'center'}}>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter Code Here"
                placeholderTextColor="black"
                onChangeText={e => {
                      this.setState({
                        Code: e,
                      });
                    }}
                ref={this.clearCode}
              />
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => this.validateCode(this.props.navigation)}>
                <Text style={styles.customBtnText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
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
    // borderWidth: 1,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    justifyContent: 'center',
    // borderColor: 'white',
    borderRadius: 25,
    width: 150,
    //margin: 10,
    marginTop: 25,
  },
  customBtnText: {
    fontSize: 35,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
  securityCodeText: {
    fontSize: 35,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
});

// export default PastorSecCodeScreen;
