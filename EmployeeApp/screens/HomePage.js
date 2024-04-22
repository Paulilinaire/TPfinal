import {Text, SafeAreaView} from "react-native";

export default function HomePage({ route, navigation }) {
  const { user } = route.params; 

  return (
    <SafeAreaView>
      <Text>Hello {user.firstname}</Text>
    </SafeAreaView>
  );
}



