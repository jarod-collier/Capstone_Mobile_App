import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class PastorSecCodeScreen extends Component {
    state = {
        Code: '',
      };
    handleCode = text => {
        this.state.Code = text;
      };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {/* <Button title="Back" style={{}}/>  TODO: ADD BACK BUTTON*/}
          <View style={styles.logo}>
            <Image source={require('../images/logo_placeholder.png')} />
          </View>
          <View>
            <Text style={{fontSize: 48, textAlign: 'center'}}>Pastors{"\n"}Security Code</Text>
          </View>
          <View style={{justifyContent:'center'}}>
          <TextInput
              style={styles.inputBox}
              placeholder="Enter Code Here"
              //NEED TO MAKE SURE THE KEYBOARD DOESN'T COVER THE BOX
              placeholderTextColor="white"
              onChangeText={this.handleCode}
            />
            <TouchableOpacity style={styles.Buttons}>
              <Button title="Confirm" /*Add on press*/ />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
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
    marginTop: 100,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 5, width: 5}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 25,
    width: 250,
    //margin: 10,
    marginTop: 50,
  },
});
