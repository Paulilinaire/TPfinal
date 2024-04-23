import {Text, SafeAreaView, StyleSheet, View, TouchableOpacity} from "react-native";

export default function HomePage({ route, navigation }) {
  const { user } = route.params; 

  
  const handlePlanning = () => {
      navigation.navigate('CalendarPage', {user});
  }

  return (
    <SafeAreaView style={styles.home_wrapper}>
      <Text style={styles.title}>{user.firstname} {user.lastname}</Text>
      <View style={styles.content}>
      <TouchableOpacity style={styles.clockInButton}>
          <Text style={styles.button_label}>{'Clock-in'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clockOutButton}>
            <Text style={styles.button_label}>{'Clock-out'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clockOutButton} onPress={handlePlanning}>
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
    backgroundColor: "#FFFFFF"
  },
  title: {
    marginTop: 40,
    marginBottom: 70,
    color:"#233863",
    fontSize: 25,
    fontWeight: 'bold'
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
    elevation: 5
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



