import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function UserLogin({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
        // send login request to backend
        const response = await axios.post('http://10.0.2.2:8080/api/auth/user', {
          email,
          password,
        });
        
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Response data:', response.data);

        // response with JWT token
        const token = response.data?.data?.token; 
        console.log("Token:", token);
  
        // store the token in AsyncStorage
        await AsyncStorage.setItem('authToken', token);
  
        setLoading(false);
  
       // redirect to HomePage
        const user = response.user;
        navigation.navigate('HomePage', {user});
  
      } catch (error) {
        setLoading(false);
        if (error.response) {
          const errorMessage = error.response.data.message || 'Login failed';
          Alert.alert('Error', errorMessage);
        } else {
          console.log("Unexpected error", error);
          Alert.alert('Error', 'An error occurred. Please try again later.');
        }
      }
    };

  return (
    <View style={styles.login_wrapper}>
      <View style={styles.form}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.desc}>Login to continue</Text>
        <TextInput
          style={styles.form_input}
          value={email}
          placeholder={'Email'}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />
        <TextInput
          style={styles.form_input}
          value={password}
          placeholder={'Password'}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Text style={styles.button_label}>{'Log in'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ 
    login_wrapper: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: "#FFFFFF"
    },
    title: {
      marginTop: 70,
      color:"#233863",
      fontSize: 25,
      fontWeight: 'bold'
    },
    desc:{
      color:"#FA9746",
      fontSize: 15,
      marginBottom: 50
    },
    form: {
      width: '80%', 
    },
    form_input: {
      borderWidth: 1, 
      borderColor: '#B0D0FF',
      borderRadius: 40,
      padding: 10, 
      marginBottom: 10, 
    },
    button: {
      backgroundColor: '#233863', 
      padding: 15, 
      borderRadius: 40, 
      alignItems: 'center', 
      marginTop: 20
    },
    button_label: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 20,
    },
  });



