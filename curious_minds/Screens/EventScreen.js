import React, {Component, useCallback, useState} from 'react';
import 'react-native-gesture-handler';
import {Card} from 'react-native-shadow-cards';
import {Button} from 'react-native-vector-icons/FontAwesome';
import { db } from '../FireDatabase/config';
import firebase from 'firebase';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  RefreshControl,
  LayoutAnimation,
} from 'react-native';

export default class EventScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      events: [],
      display: [],
      canAdd: false,
      Loading: true,
    };

    // const [isLoading, setLoading]= useState(true);
    this.readFromDB();

  }

  makeDelay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  addToCalendar(title, date, time){
    date = date.split(" ");
    time = time.split(":");
    const year = date[3];
    var month = "";
    switch(date[1]){
      case "Jan":
        month = "01";
        break;
      case "Feb":
        month = "02";
        break;
      case "Mar":
        month = "03";
        break;
      case "Apr":
        month = "04";
        break;
      case "May":
        month = "05";
        break;
      case "Jun":
        month = "06";
        break;
      case "Jul":
        month = "07";
        break;
      case "Aug":
        month = "08";
        break;
      case "Sep":
        month = "09";
        break;
      case "Oct":
        month = "10";
        break;
      case "Nov":
        month = "11";
        break;
      case "Dec":
        month = "12";
        break;
    }
    const day = date[2];
    var hour = "";
    const min = time[1].substring(0,time[1].length -3);
    if(time[0].length < 2){
      hour = "0" + time[0];
    }else{
      hour = time[0];
    }

    const startDate = (""+ year + "-" + month + "-" + day + "T" + hour + ":" + min + ":00.000Z");

    const eventConfig = {
      title,
      startDate,
    };
    AddCalendarEvent.presentEventCreatingDialog(eventConfig);
  }

  async canAddEvent (){
    let uid = firebase.auth().currentUser.uid;
    await db.ref('/userInfo/').once('value', function(snapshot){
      snapshot.forEach((child) => {
        if(child.val().uid === uid){
          if(child.val().userType === "pastor"){
            this.state.canAdd = true;
          }
        }
      });
    }.bind(this));
  }

  async readFromDB(){
    this.state.Loading = true;
    await db.ref('/events/').once('value', function(snapshot){
        let postItems = [];
        snapshot.forEach((child) => {
            postItems.push({
                title: child.val().title,
                desc: child.val().desc,
                date: child.val().date,
                time: child.val().time,
                location: child.val().location,
            });
        })
        this.state.events = postItems.reverse();
    }.bind(this));
    await this.canAddEvent();
    await this.loadEventCards();
  }

  async loadEventCards(){
    this.state.display = this.state.events.map(eventData => {
      return(
        <View key={eventData.title}>
            <Card style={{ padding: 15, margin:5, alignSelf: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{eventData.title}</Text>
              <Text style={{marginTop: 3}}>{eventData.desc}</Text>
              <Text>Date: {eventData.date}</Text>
              <Text>Time: {eventData.time}</Text>
              <TouchableOpacity
              style={styles.Buttons}
              onPress={() => this.addToCalendar(eventData.title, eventData.date, eventData.time)}
              >
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.customBtnText}>Add event to calendar</Text>
                  <Button
                    style={{backgroundColor: 'green'}}
                    name="calendar"
                    color="white" />
                </View>
              </TouchableOpacity>
            </Card>
        </View>
      )
    });
    this.state.Loading = false;
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      setTimeout(()=> this.setState({Loading: false}), 500),
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.Loading}
              onRefresh={() => {
                this.setState({Loading: true}),
                this.makeDelay(2000).then(()=> this.setState({Loading: false}))}}
            />
          }
        >
        <View style={styles.container}>
          { this.state.canAdd &&
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => this.props.navigation.navigate('Add Event')}
            >
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.customBtnText}>Add New Event</Text>
                <Button
                  style={{backgroundColor: 'green'}}
                  name="calendar"
                  color="white" />
              </View>
            </TouchableOpacity>
          }
        </View>
        <View style={styles.container}>
        {(this.state.display.length > 0) ?
          this.state.display
          :
          <Text style={{color: 'black', alignSelf: 'center', opacity: 0.5}}>No events found. Please make a new event</Text>
        }
        </View>
        </ScrollView>
      </SafeAreaView>
   );
  }
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
    marginVertical: 15,
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
// export default EventScreen;
