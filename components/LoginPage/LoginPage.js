import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';
import { login } from '../../Api/Api';
import { UserContext } from '../../Api/Context';
import { _removeData } from '../../Api/StoreData';

const styles = StyleSheet.create({
  clickText: {
    color: 'lightgreen',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  viewStyle: {
    marginTop: 130,
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 20,
    marginLeft: 40,
    marginRight: 40,
    width: '85%',
    borderRadius: 20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  clickButton: {
    color: 'blue'
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default function LoginPage({navigation}) {
  const [user,setUser] = useState('');
  const [pass,setPass] = useState('');
  const [loginStatus, setLoginStatus] = useState(0);
 
  useEffect(()=>{    
    

  },[]);
  const handleSubmit = () => {  
   login(user,pass)   
  };
  const handleLogout = () => {
    _removeData('userdata');
    navigation.navigate('Home');
  }

  return (
    <View style={styles.viewStyle}>  
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={styles.textTitle}>Đăng nhập vào hệ thống</Text>
      <Text style={styles.clickText}>Điền tên đăng nhập và mật khẩu nhé</Text>
      <TextInput style={styles.input} placeholder="Tên đăng nhập" value={user} onChangeText={setUser}/>
      <TextInput style={styles.input} placeholder="Mật khẩu" autoComplete='password' secureTextEntry={true} value={pass}  onChangeText={setPass}/>
      <View style={styles.fixToText}>    
        <Button style={styles.clickButton} onPress={() => {handleSubmit();}} title="Đăng nhập" color="blue"/>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />    
        <Button title="Logout" onPress={() => { handleLogout();}} />      
      </View>
    </View>
  );
}
