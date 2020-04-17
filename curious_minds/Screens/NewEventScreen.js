import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Image,
  Button,
  Overlay,
  Alert,
  Platform,
} from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { db } from '../FireDatabase/config';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';



var state = {
    Name: '',
    Description: '',
    location: '',
    chosenDate: '',
    chosenTime: '',
  };

const handleName = text => {
    state.Name = text;
};

const handleDescription = text => {
    state.Description = text;
};

const handleLocation = text => {
    state.location = text;
};

function createEvent(){

  db.ref('/events').push({
    title: state.Name,
    desc: state.Description,
    date: state.chosenDate,
    time: state.chosenTime,
    location: state.location,
  }.bind(this)).catch((error)=>{
    Alert.alert('error ', error)
  })

  Alert.alert('Event added successfully');
};

var clearName = React.createRef();
var clearDescription = React.createRef();
var clearLocation = React.createRef();

function NewEventScreen({navigation}) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    let currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
    state.chosenDate = currentDate.toString().substring(0,16);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    // setShow(Platform.OS === 'ios');
    setTime(currentTime);
    let hours24 = currentTime.getHours();
    let mins = currentTime.getMinutes();
    if (mins < 10){
        mins = "0"+mins;
    }
    let period = hours24 > 12 ? "PM" : "AM";
    let hours12 = (currentTime.getHours() + 24) %12 || 12
    state.chosenTime = '' + hours12 + ":" + mins + " " + period;
  };

  const showDatepicker = () => {
    setShowDate(!showDate);
  };

  const showTimepicker = () => {
    setShowTime(!showTime);
  };

  LayoutAnimation.easeInEaseOut();

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        clearName.current.clear();
        clearDescription.current.clear();
        clearLocation.current.clear();
      };
    }, [])
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
        >
          <View style={styles.container}>
            <View>
              <Text style={{ marginTop: 40, marginLeft: 15, fontSize: 24, }}>
              Event Title
              </Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Type event title here"
                placeholderTextColor="black"
                onChangeText={handleName}
                ref={clearName}
              />
            </View>
            <View>
              <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 24, }}>
                Description
              </Text>
              <TextInput
                style={styles.multiline}
                placeholder="Type event description here"
                placeholderTextColor="black"
                multiline={true}
                numberOfLines={10}
                onChangeText={handleDescription}
                ref={clearDescription}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 24, }}>
                Date:
              </Text>
              <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 20, }}>
                {state.chosenDate}
              </Text>
              <TouchableOpacity style={styles.setButtons} onPress={showDatepicker} >
                <Text style={{ fontSize: 16, }}>
                  Set Date
                </Text>
              </TouchableOpacity>
            </View>
            {showDate &&
              <DateTimePicker
                value={date}
                mode={'date'}
                onChange={onChangeDate}
              />
            }
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 24, }}>
                Time:
              </Text>
              <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 20, }}>
                {state.chosenTime}
              </Text>
              <TouchableOpacity style={styles.setButtons} onPress={showTimepicker} >
                <Text style={{ fontSize: 16, }}>
                  Set Time
                </Text>
              </TouchableOpacity>
            </View>
            {showTime &&
              <DateTimePicker
                value={time}
                mode={'time'}
                onChange={onChangeTime}
              />
            }
            <View>
              <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 24, }}>
                Location:
              </Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Type event location here"
                placeholderTextColor="black"
                onChangeText={handleLocation}
                ref={clearLocation}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => {createEvent(); navigation.navigate('Events')}}
              >
                <Text style={styles.customBtnText}>Add Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
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
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: 'black',
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
    // borderColor: 'black',
    borderRadius: 15,
    height: 40,
    marginHorizontal: 15,
    marginBottom: 35,
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
  setButtons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    // borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    // alignSelf: 'stretch',
    alignItems: 'center',
    // borderColor: 'black',
    borderRadius: 8,
    // height: 30,
    width: 90,
    marginHorizontal: 15,
    marginTop: 17,
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

export default NewEventScreen;
