import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Button,
  Modal,
  StatusBar,
  Alert,
  BackgroundImage,
  SafeAreaView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import About from "./components/About";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const img = require("./assets/adaptive-icon.png");

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomePage" component={Home} />
          <Stack.Screen name="ABOUT" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
});
