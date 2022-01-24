import React from 'react';
import { View, Text } from 'react-native';


const styles = {
    texthome: {
        color: 'lightgreen',
        fontWeight: 'bold',
        fontSize: 15,
        margin:auto,
        textAlign: 'center',
    }
}
export default function HomePage() {
    return (
        <View>
            <Text style={styles.texthome}>Home Page</Text>
        </View>
    );
}

