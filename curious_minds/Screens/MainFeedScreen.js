import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {Card} from 'react-native-shadow-cards';
import {Button} from 'react-native-vector-icons/FontAwesome';
import {AnimatedEllipsis} from 'react-native-animated-ellipsis';
import { db } from '../FireDatabase/config';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
//   TouchableOpacity,
  ScrollView,
//   Image,
//   Button,
  Alert,
  LayoutAnimation,
} from 'react-native';

this.state = {
    posts: [],
    display: [],
    isLoading: true,
};

// this.setLoadingStatus = Boolean => {
//     this.state.isLoading = Boolean;
// }

// const getLoadingStatus = ()=> {
//     return this.state.isLoading;
// }

function readFromDB(){
    // this.setLoadingStatus(false);
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
    // this.setLoadingStatus(true);
}

function MainFeedScreen({navigation}) {
    // const [isLoading, setLoading]= useState(true);
    readFromDB();
    // LayoutAnimation.easeInEaseOut();
    // console.log("I'm here");
    // if(isLoading){
    //     console.log("I'm here2");
    //       return(
    //         <View>
    //             <Text>
    //                 Loading
    //                 {/* <AnimatedEllipsis /> */}
    //             </Text>
    //         </View>
    //       );
          
    // }
    // else{
        return ( 
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.container}>
                        {this.state.display}
                    </View>
                </ScrollView>
            </SafeAreaView>
          );
    // }
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
