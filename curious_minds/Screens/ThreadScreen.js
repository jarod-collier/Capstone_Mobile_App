import React, {Component, useCallback, useState} from 'react';
import 'react-native-gesture-handler';
import {Card} from 'react-native-shadow-cards';
import {Button} from 'react-native-vector-icons/FontAwesome';
import { db } from '../FireDatabase/config';
import firebase from 'firebase';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
  RefreshControl,
  LayoutAnimation,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var state = {
  display: [],
  comments: [],
  Loading: true,
  comment: ''
};

const handleComment = text => {
    state.comment = text;
  };

const delay = ms => new Promise(res=>setTimeout(res,ms));

function addComment(postID){
    state.Loading = true;
    db.ref('/posts/' + postID).push({
        comment: state.comment
      }).catch((error)=>{
        Alert.alert('error ', error)
      })
    
      Alert.alert('comment added successfully');
      state.Loading = false;
}

async function readFromDB(postID){
  state.Loading = true;
  let commentItems = [];
  let postItems = [];
  await db.ref('/posts/' + postID).once('value', function(snapshot){
    snapshot.forEach((child) => {
        if(child.hasChildren()){
            // console.log(child);
            commentItems.push({comment: child.val().comment});
        }
        });
        // console.log(commentItems);
      
 
      postItems.push({
        key: postID,
        question: snapshot.val().question,
        desc: snapshot.val().desc,
        anon: snapshot.val().Anon,
        pastorOnly: snapshot.val().PastorOnly
      })
  });
  await loadCommentCards(commentItems);
  await loadPostCards(postItems);
}

async function loadCommentCards(commentItems){
    var cardId = 0;
    state.comments = commentItems.map(commentData => {
        cardId++;
      return(
        <View key={cardId}>
          <Card style={{ padding: 15, margin: 5, alignSelf: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{commentData.comment}</Text>
              {/* //This needs to be fixed */}
              <Text style={{alignSelf: 'flex-end', opacity: 0.5}}>Posted by: </Text>
              <View style={{flexDirection:'row', alignItems: 'stretch'}}>
                <Button
                  style={{backgroundColor: 'white'}}
                  color='black'
                  name='exclamation-triangle'
                  onPress={()=> Alert.alert('Report')} />
                <Text style={{alignSelf: 'center', opacity: 0.5}}>DATE HERE</Text>
            </View>
          </Card>
        </View>
      )
    });
  }

async function loadPostCards(postItems){
    state.display = postItems.map(postData => {
      return(
        <View key={postData.key}>
          <Card style={{ padding: 15, margin: 5, alignSelf: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{postData.question}</Text>
              <Text style={{marginTop: 3}}>{postData.desc}</Text>
              {/* //This needs to be fixed */}
              <Text style={{alignSelf: 'flex-end', opacity: 0.5}}>Posted by: {postData.Anon}</Text>
              <View style={{flexDirection:'row', alignItems: 'stretch'}}>
                <Button
                  style={{backgroundColor: 'white'}}
                  color='black'
                  name='comment'
                  onPress={()=> Alert.alert('Comment')} />
                <Button
                  style={{backgroundColor: 'white'}}
                  color='black'
                  name='language'
                  onPress={()=> Alert.alert('Translate')} />
                <Button
                  style={{backgroundColor: 'white'}}
                  color='black'
                  name='thumbs-up'
                  onPress={()=> Alert.alert('Like')} />
                <Button
                  style={{backgroundColor: 'white'}}
                  color='black'
                  name='exclamation-triangle'
                  onPress={()=> Alert.alert('Report')} />
                <Text style={{alignSelf: 'center', opacity: 0.5}}>DATE HERE</Text>
            </View>
          </Card>
        </View>
      )
    });
    state.Loading = false;
  }

function ThreadScreen({route, navigation}) {
    postID = route.params;
  const [isLoading, setLoading]= useState(true);
  const onRefresh = useCallback(() => {
    setLoading(true);
    delay(2000).then(()=> setLoading(false))}, [isLoading]
  );
  readFromDB(postID);
  LayoutAnimation.easeInEaseOut();
  return (
    setTimeout(()=> setLoading(state.Loading), 500),
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
      style={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.container}>
            {state.display}
            {state.comments}
            <Text style={
            {
              marginTop: 20,
              marginLeft: 18,
              fontSize: 24,
            }}>
              Add comment:
          </Text>
        <TextInput
            style={styles.multiline}
            multiline = {true}
            numberOfLines={10}
            placeholder="  Enter Comment Here"
            placeholderTextColor="black"
            onChangeText={handleComment}
            />
        <TouchableOpacity
            style={styles.Buttons}
             onPress={() => {addComment(postID), onRefresh}}
            >
            <Text style={styles.customBtnText}>Post</Text>
          </TouchableOpacity>
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
    textAlign: 'center',
    // padding: 10,
    margin: 10,
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
    alignSelf: 'flex-end',
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 30,
    height: 30,
    marginHorizontal: 15,
  },
  multiline: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'stretch',
    height: 100,
    textAlign: 'left',
    margin: 10,
    marginHorizontal: 18,
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
export default ThreadScreen;
