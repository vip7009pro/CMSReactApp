import { CurrentRenderContext } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { _removeData, _retrieveData } from '../../Api/StoreData';



const styles = {
    texthome: {
        color: 'lightgreen',
        fontWeight: 'bold',
        fontSize: 15,        
        textAlign: 'center'
    },
    totalView: {
        
    }
}
export default function HomePage({navigation}) {

    
    const handleLogout = () => {        
        let checkuserdata = _retrieveData('userdata');
        console.log(checkuserdata);
        _removeData('userdata');
        navigation.navigate('Login');
      }


    return (
        <View>
            <Text style={styles.texthome}>Home Page</Text>
            <Button title="Logout" onPress={() => { handleLogout();}} />              
        </View>
    );
}

