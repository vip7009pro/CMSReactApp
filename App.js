import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import LoginPage from './components/LoginPage/LoginPage';
import { UserContext } from './Api/Context';
import AuthScreen from './components/LoginPage/AuthScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { _retrieveData, _storeData } from './Api/StoreData';
import HomePage from './Screen/HomePage/HomePage';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
const Stack = createStackNavigator();
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

  const checkLogin = () => {
    (async () => {
      //console.log("Dang check login");
      let userdata1 = await _retrieveData('userdata');
      let userdata = JSON.parse(userdata1);
      //console.log(userdata);
      if (userdata.login_status == 'ok') {
        setloginState(1);
        setUserData(userdata.userInfo);
      }
      else {
        setloginState(0);
      }
    })();
  }
  checkLogin();

  useEffect(() => {
    checkLogin();    
    return () => { };
  }, []);
  console.log('Login State = ' + loginState);
  if (loginState == 1) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"}>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Login" component={AuthScreen} />
          <Stack.Screen name="Details" component={LoginPage} />
        </Stack.Navigator>
      </NavigationContainer>      
    )
  }
  else if (loginState == 0) {
    return (
      <UserContext.Provider value={[userdata, setUserData]}>
        <View style={styles.viewStyle}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Home"}>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Login" component={AuthScreen} />
            <Stack.Screen name="Details" component={LoginPage} />
          </Stack.Navigator>
        </NavigationContainer>     
        </View>
      </UserContext.Provider>
    );
  } else {
    return <LoginPage />;
  }
};
export default App;
