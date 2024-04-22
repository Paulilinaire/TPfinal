import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from './screens/HomePage'
import UserLogin from './screens/UserLoginScreen'
import { NavigationContainer } from '@react-navigation/native'




const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='UserLogin'>
        <Stack.Screen name='HomePage' component={HomePage} />
        <Stack.Screen name='UserLogin' component={UserLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({});