import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import LoginPage from './components/LoginPage/LoginPage';
import { UserContext } from './Api/Context';
import { checkLogin, generalQuery, testpost } from './Api/Api';
import Cookies from 'universal-cookie';
import AuthScreen from './components/LoginPage/AuthScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { _retrieveData, _storeData } from './Api/StoreData';
import HomePage from './Screen/HomePage/HomePage';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
const Stack = createStackNavigator();
const cookies = new Cookies();
const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#10C5CE',
  },
  textStyle: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
const App = () => {
  const [loginState, setloginState] = useState(0);
  const [userdata, setUserData] = useState('okma');

  useEffect(() => {       
    let userdata = _retrieveData('userdata');
    console.log(userdata);
    
    if(userdata!=-1) 
    {
      setloginState(1);
      setUserData(userdata);    
    }
    else
    {
      setloginState(0);
    }
    return () => { };
  }, []);
  console.log('Login State = ' + loginState);
  if (loginState == 1) {
    return (
      <HomePage/>     
    )
  }
  else if (loginState == 0) {
    return (
      <UserContext.Provider value={[userdata, setUserData]}>
        <View style={styles.viewStyle}>
          <AuthScreen />
        </View>
      </UserContext.Provider>
    );
  } else {
    return <LoginPage />;
  }
};
export default App;
