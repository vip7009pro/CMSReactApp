import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Alert, Button } from 'react-native';
import { generalQuery, login } from '../../Api/Api';
import { _retrieveData, _storeData } from '../../Api/StoreData';
export default function AuthScreen({navigation}) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [loginState, setloginState] = useState(0);
    const navi = () => {
        navigation.navigate('Details');
    }
    useEffect(() => {
        (async () => {
            let userdata = await _retrieveData('userdata');
            //console.log('user data = ' + userdata);
            if (userdata.login_status == 'ok') {
                setloginState(1);
            }
            else {
                setloginState(0);
            }
        })();
        return () => { };
    }, []);
    const handleSubmit = async () => {
        let submitData = {
            user: user,
            pass: pass
        };
        generalQuery('login2', submitData)
            .then(response => {
                let kq = response.data.tk_status;
                if (kq == 'ok') {
                    let userData = {
                        login_status: 'ok',
                        userInfo: response.data.user_data
                    };
                    //console.log(userData);
                    _storeData('userdata', JSON.stringify(userData));
                    //_storeData('userdata','useroke333333');
                    let storeddata = _retrieveData('userdata');
                    //console.log('data luu tru la: ' + storeddata);
                    navigation.navigate('Home');
                }
                else {
                    Alert.alert(
                        "Thông báo",
                        "Tên đăng nhập hoặc mật khẩu không đúng",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            })
            .catch(error => {
                console.log(error);
            })
    };
    return (
        <ImageBackground source={require('../LoginPage/basic.png')} style={styles.image}>
            <View style={styles.card}>
                <Text style={styles.heading}>{'Login'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setUser}></TextInput>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPass}></TextInput>
                        <TouchableOpacity style={styles.button} onPress={() => { handleSubmit(); }}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <Button title="Go to Detail" onPress={() => { navi(); }} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '80%',
        marginTop: '40%',
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16,
        minHeight: 40,
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
});
