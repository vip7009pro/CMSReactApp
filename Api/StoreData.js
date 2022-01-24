import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
export const _storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(
        key,
        value
      );
    } catch (error) {
      // Error saving data
    }
  };

export  const _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return value;
        console.log("Gia tri key = " +  value);
        Alert.alert(value);
      }
      else
      {
          return -1;
      }

    } catch (error) {
      // Error retrieving data
      
    }
  };
  
export const _removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('key removed ');
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
};
