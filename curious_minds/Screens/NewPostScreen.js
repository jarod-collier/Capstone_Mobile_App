import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {CheckBox} from 'react-native-elements';
import firebase from 'firebase';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Image,
  Button,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { db } from '../FireDatabase/config';
import { useFocusEffect } from '@react-navigation/native';

var state = {
    checked: {},
    Question: '',
    Description: '',
    Anon: false,
    pastorOnly: false,
    username: '',
  };

const handleQuestion = text => {
    state.Question = text;
};

const handleDescription = text => {
    state.Description = text;
};

var handleOptionAnon = Boolean => {
    state.Anon = Boolean;
};

var handleOptionPastorOnly = Boolean => {
    state.pastorOnly = Boolean;
};

async function createPost(){
  let uid = firebase.auth().currentUser.uid;
  await db.ref('/userInfo/').once('value', function(snapshot){
    snapshot.forEach((child) => {
        if(child.val().uid === uid){
          state.username = child.val().Username;
        }
    })
  });

  db.ref('/posts').push({
    username: "" + state.username,
    date: "" + new Date().toLocaleDateString(),
    question: "" + state.Question,
    desc: "" + state.Description,
    Anon: state.Anon,
    PastorOnly: state.pastorOnly
  }).catch((error)=>{
    Alert.alert('error ', error)
  })

  Alert.alert('Post added successfully');
};

var clearQuestion = React.createRef();
var clearDescription = React.createRef();

function NewPostScreen({navigation}) {
  const [Anon, setAnon] = useState(false);
  const [pastorOnly, setPastorOnly] = useState(false);
  handleOptionAnon(Anon);
  handleOptionPastorOnly(pastorOnly);
  LayoutAnimation.easeInEaseOut();
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        clearQuestion.current.clear();
        clearDescription.current.clear();
        setPastorOnly(false);
        setAnon(false);
        // pastorOnly = false;
        // Anon = false;
      };
    }, [])
  );
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
            Your Question
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Type your question here"
            placeholderTextColor="black"
            onChangeText={handleQuestion}
            ref={clearQuestion}
          />
        </View>
        <View>
          <Text style={
            {
              marginTop: 20,
              marginLeft: 15,
              fontSize: 24,
            }}>
              Description
          </Text>
          <TextInput
            style={styles.multiline}
            placeholder="Type your description here"
            placeholderTextColor="black"
            multiline={true}
            numberOfLines={10}
            onChangeText={handleDescription}
            ref={clearDescription}
          />
        </View>
        <View>
          <Text style={
            {
              marginTop: 20,
              marginLeft: 15,
              fontSize: 24,
            }}>
              Attachment:
          </Text>
        </View>
        <View>
          <Text style={
            {
              marginTop: 20,
              marginLeft: 15,
              fontSize: 24,
            }}>
              Options:
          </Text>
          <View style={{ flexDirection: 'row'}}>
            <CheckBox
              checked={Anon}
              checkedColor='dodgerblue'
              uncheckedColor='black'
              onPress={()=> {handleOptionAnon(!Anon); setAnon(!Anon)}}
            />
            <Text style={{marginTop: 15, fontSize: 18}}>post anonymous</Text>
          </View>
          <View style={{ flexDirection: 'row'}}>
            <CheckBox
              checked={pastorOnly}
              checkedColor='dodgerblue'
              uncheckedColor='black'
              onPress={() => {handleOptionPastorOnly(!pastorOnly); setPastorOnly(!pastorOnly)}}
            />
            <Text style={{marginTop: 15, fontSize: 18}}>only pastor response</Text>
          </View>
        </View>
        <View style={{bottom: 0, position: 'absolute', justifyContent: 'center', alignSelf: 'center'}}
        >
          <TouchableOpacity
            style={styles.Buttons}
             onPress={async () => {await createPost(); navigation.navigate('Main')}}
            >
            <Text style={styles.customBtnText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
  },
  logo: {
    margin: 100,
  },
  inputBox: {
    alignItems:'stretch',
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    textAlign: 'left',
    padding: 10,
    margin: 15,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderColor: 'green',
    borderRadius: 15,
    height: 40,
    width: 350,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  multiline: {
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    alignItems: 'stretch',
    height: 150,
    textAlign: 'left',
    margin: 15,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
  footer: {
    bottom: 0,
  },
});

export default NewPostScreen;
