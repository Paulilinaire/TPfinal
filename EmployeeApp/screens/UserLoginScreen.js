import React, {FC, ReactElement, useState} from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import Styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function UserLoginScreen() {
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
        // Send login request to backend
        const response = await axios.post('http://XXXXXXX/api/auth/user', {
          email,
          password,
        });
  
        // response with JWT token
        const { token, user } = response.data;
  
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('authToken', token);
  
        setLoading(false);
  
       // redirect into HomePage
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
    <View style={Styles.login_wrapper}>
      <View style={Styles.form}>
        <TextInput
          style={Styles.form_input}
          value={email}
          placeholder={'email'}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />
        <TextInput
          style={Styles.form_input}
          value={password}
          placeholder={'Password'}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => {}}>
          <View style={Styles.button}>
            <Text style={Styles.button_label}>{'Sign in'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ 
    form_input:{

    },
    button:{

    },
    button_label:{

    }
 });


