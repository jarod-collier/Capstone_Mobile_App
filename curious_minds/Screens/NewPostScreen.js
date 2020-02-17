import 'react-native-gesture-handler';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import {CheckBox} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/free-solid-svg-icons';
// import CheckboxFormX from 'react-native-checkbox-form';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

this.state = {
    Question: '',
    Description: '',
    Anon: false,
    pastorOnly: false,
  };

this.handleQuestion = text => {
    this.state.Question = text;
};

this.handleDescription = text => {
    this.state.Description = text;
};

this.handleOptionAnon = Boolean => {
    this.state.Anon = !this.state.Anon;
    //console.log(this.state.Anon);
};

this.handleOptionPastorOnly = Boolean => {
    this.state.pastorOnly = !this.state.pastorOnly;
    //console.log(this.state.pastorOnly);
};

function NewPostScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
          <View>
            <Text style={
                {
                 marginTop: 40,
                 marginLeft: 15,
                 fontSize: 24,
                }}>
                    Your Question</Text>
            <TextInput
                style={styles.inputBox}
                placeholder="Type your question here"
                placeholderTextColor="white"
                onChangeText={this.handleQuestion}
            />
          </View>
      <View>
      <Text style={
            {
             marginTop: 20,
             marginLeft: 15,
             fontSize: 24,
            }}>
                Description</Text>
        <TextInput
            style={styles.multiline}
            placeholder="Type your description here"
            placeholderTextColor="white"
            multiline={true}
            numberOfLines={10}
            onChangeText={this.handleDescription}
          />
      </View>
      <View>
          <Text style={
            {
             marginTop: 20,
             marginLeft: 15,
             fontSize: 24,
            }}>
                Attachment:</Text>      
      </View>
      <View>
          <Text style={
            {
             marginTop: 20,
             marginLeft: 15,
             fontSize: 24,
            }}>
                Options:</Text> 
          <CheckBox
            title='post anonymous'
            // checkedIcon='dot-circle-o'
            // uncheckedIcon='check'
            onPress={()=> this.handleOptionAnon()}
          />
          <CheckBox
            title='only pastor response'
            onPress={()=> this.handleOptionPastorOnly()}
          />
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
  },
  logo: {
    margin: 100,
  },
  inputBox: {
    alignItems:'stretch',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    textAlign: 'left',
    padding: 10,
    margin: 15,
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
    width: 150,
    height: 150,
    margin: 10,
    marginTop: 50,
  },
  multiline: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'stretch',
    height: 150,
    textAlign: 'left',
    margin: 15,
  },
});

export default NewPostScreen;
