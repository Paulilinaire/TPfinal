import {Text, SafeAreaView} from "react-native";

export default function HomePage({ route, navigation }) {
  const { user } = route.params; 

  return (
    <SafeAreaView style={styles.home_wrapper}>
      <Text style={styles.title}>{user.firstname} {user.lastname}</Text>
      <View style={styles.content}>
      <TouchableOpacity>
          <View style={styles.clockInButton}>
            <Text style={styles.button_label}>{'Clock-in'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.clockOutButton}>
            <Text style={styles.button_label}>{'Clock-out'}</Text>
          </View>
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
    color:"#233863",
    fontSize: 25,
    fontWeight: 'bold'
  },
  content: {
    width: '80%', 
  },
  clockInButton: {
    backgroundColor: '#3586FD', 
    padding: 15, 
    borderRadius: 20, 
    alignItems: 'center', 
    marginTop: 20
  },
  clockOutButton: {
    backgroundColor: '#FA9746', 
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



