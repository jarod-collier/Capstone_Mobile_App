import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {Card} from 'react-native-shadow-cards';
// import {Icon} from 'react-native-vector-icons';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
  Alert,
  LayoutAnimation,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { db } from '../FireDatabase/config';

this.state = {
    postValue: 0,
    posts: [],
    display: []
};

function readFromDB(){
    db.ref('/posts/').on('value', function(snapshot){
        let postItems = [];
        snapshot.forEach((child) => {
            postItems.push({
                question: child.val().question,
                desc: child.val().desc,
                anon: child.val().Anon,
                pastorOnly: child.val().PastorOnly
            });
        })
        this.state.posts = postItems.reverse();
    });
    
    loadPostCards();
}

function loadPostCards(){
    this.state.display = this.state.posts.map(postData => {
        return(
            <View key={postData.question}>
                <Card style={{ padding: 15, margin:5, alignSelf: 'center'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{postData.question}</Text>
                        <Text style={{marginTop: 3}}>{postData.desc}</Text>
                        {/* //This needs to be fixed */}
                        <Text style={{alignSelf: 'flex-end', opacity: 0.5}}>Posted by: {postData.Anon}</Text>
                        <Text style={{alignSelf: 'flex-end', opacity: 0.5}}>DATE HERE</Text>
                        <Icon name='chat_bubble_outline' type='material'/>
                </Card>
            </View>
        )
    })
}

function MainFeedScreen({navigation}) {
    readFromDB();
    // console.log(this.state.display);
    LayoutAnimation.easeInEaseOut();
  return (
    <SafeAreaView style={{flex: 1}}>
        <ScrollView>
            <View style={styles.container}>
                {this.state.display}
            </View>
        </ScrollView>
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
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderColor: 'white',
    borderRadius: 15,
    height: 40,
    marginHorizontal: 15,
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
  customBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
  footer: {
    bottom: 0,
  },
});

export default MainFeedScreen;
