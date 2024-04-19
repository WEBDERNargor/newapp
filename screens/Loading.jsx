import { View, Text,Image } from 'react-native'
import React, {  useEffect } from 'react';

const Loading = ({navigation}) => {
    
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 3000);
      }, []);
  return (
    <View style={{
      
        backgroundColor:"#F4F5AB",
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center', 
    alignItems: 'center'}}>
           <Image
        style={{  
            width: 300, // กำหนดความกว้าง
            height: 200, // กำหนดความสูง
        }}
        source={require('../img/android-chrome-512x512.png')}
        resizeMode="contain"
      />
    </View>
  )
}

export default Loading