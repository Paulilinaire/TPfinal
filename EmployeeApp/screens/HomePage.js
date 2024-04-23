import axios from 'axios';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage({route, navigation}) {
  const {user} = route.params;

  const handlePlanning = () => {
    navigation.navigate('CalendarPage', {user});
  };

  const handleClockIn = async () => {
    try {
      AsyncStorage.getItem('authToken').then(async value => {
        if (value) {
          const response = await axios.get(
            'http://10.0.2.2:8080/api/user/pointing/start',
            {
              headers: {Authorization: 'Bearer ' + value},
            },
          );
          if (response.data.message == 'Error') {
            Alert.alert('Error', response.data.data.error);
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleClockOut = async () => {
    try {
      AsyncStorage.getItem('authToken').then(async value => {
        if (value) {
          const response = await axios.get(
            'http://10.0.2.2:8080/api/user/pointing/end',
            {
              headers: {Authorization: 'Bearer ' + value},
            },
          );
          if (response.data.message == 'Error') {
            Alert.alert('Error', response.data.data.error);
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.home_wrapper}>
      <Text style={styles.title}>
        {user.firstname} {user.lastname}
      </Text>
      <View style={styles.content}>
        <TouchableOpacity style={styles.clockInButton} onPress={handleClockIn}>
          <Text style={styles.button_label}>{'Clock-in'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clockOutButton}
          onPress={handleClockOut}>
          <Text style={styles.button_label}>{'Clock-out'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clockOutButton}
          onPress={handlePlanning}>
          <Text style={styles.button_label}>{'Planning'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  home_wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginTop: 40,
    marginBottom: 70,
    color: '#233863',
    fontSize: 25,
    fontWeight: 'bold',
  },
  content: {
    width: '80%',
  },
  clockInButton: {
    backgroundColor: '#3586FD',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 60,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    elevation: 5,
  },
  clockOutButton: {
    backgroundColor: '#FA9746',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    elevation: 5,
  },
  button_label: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
