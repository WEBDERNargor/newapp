import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';

const Loading = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home');
            // หรือใช้ navigation.reset ตามที่ได้กล่าวไว้ข้างต้น
        }, 3000);
    }, [navigation]);

    return (
        <View style={{
            backgroundColor: "#F4F5AB",
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image
                style={{
                    width: 300,
                    height: 200,
                }}
                source={require('../img/android-chrome-512x512.png')}
                resizeMode="contain"
            />
        </View>
    )
}

export default Loading;
