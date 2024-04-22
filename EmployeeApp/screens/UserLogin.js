import React, {FC, ReactElement, useState} from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

export default function UserLogin() {
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
        const response = await axios.post('http://localhost:8080/api/auth/user', {
          email,
          password,
        });
  
        // response with JWT token
        const { token, user } = response.data;
  
        // store the token in AsyncStorage
        await AsyncStorage.setItem('authToken', token);
  
        setLoading(false);
  
       // redirect to HomePage
        navigation.replace('HomePage', { user });
  
      } catch (error) {
        setLoading(false);
        if (error.response) {
          const errorMessage = error.response.data.message || 'Login failed';
          Alert.alert('Error', errorMessage);
        } else {
          Alert.alert('Error', 'An error occurred. Please try again later.');
        }
      }
    };

  return (
    <View style={styles.login_wrapper}>
      <View style={styles.form}>
        <Text style={styles.title}>Welcome BacK!</Text>
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
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.button}>
            <Text style={styles.button_label} onPress={handleLogin}>{'Log in'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ 
    login_wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#FFFFFF"
    },
    title: {
      color:"#233863",
      fontSize: 25,
      fontWeight: 'bold'
    },
    desc:{
      color:"#FA9746",
      fontSize: 15,
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
    },
    button_label: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 20,
    },
  });



