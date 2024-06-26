// import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Loading from './screens/Loading';
import Detail from './screens/Detail';

const Stack = createNativeStackNavigator();
const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Load"
          component={Loading}
          options={{headerShown:false}}
         
        />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}  />
        <Stack.Screen name="Detail" component={Detail} options={{headerShown:false}}  />
      </Stack.Navigator>
    </NavigationContainer>
    
  
  );
}
export default App