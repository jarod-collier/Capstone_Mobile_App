/******************************************************************************
 * Authors: Jarod Collier, Mazen Ashgar, and Brendan Cronan
 *
 * @format
 * @flow
 *****************************************************************************/
import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


// import 'react-native-gesture-handler';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './Screens/LoginScreen';
import UserTypeScreen from './Screens/UserTypeScreen';
import PastorSecCodeScreen from './Screens/PastorSecCodeScreen';
import UserSignUpScreen from './Screens/UserSignUpScreen';
import PastorSignUpScreen from './Screens/PastorSignUpScreen';

// const RootStack = createStackNavigator(
//   {
//     LoginScreen: LoginScreen,
//     UserTypeScreen: UserTypeScreen,
//   },
//   {
//     initialRouteName: 'LoginScreen',
//   },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class App extends React.Component {
//   render() {
//     return <LoginScreen />;
//   }
// }
// const App: () => React$Node = () => {
//   return (
//     // <LoginScreen />
//      <UserTypeScreen />
//     // <PastorSecCodeScreen />
//     // <UserSignUpScreen />
//    // <PastorSignUpScreen />
//   );
// };

// const styles = StyleSheet.create({});
//
// export default App;

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={UserTypeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="PastorSecCodeScreen" component={PastorSecCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// function HomeScreen({navigation}) {
//   return (
//     <Button
//       title="Go to Jane's profile"
//       onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
//     />
//   );
// }
