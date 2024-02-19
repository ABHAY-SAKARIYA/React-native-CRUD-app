import { ScrollView, StyleSheet, Text, View } from "react-native";
import Carousal from "./about_components/Carousal";
import Cards from "./about_components/Cards";

export default function About({ navigation }) {
  const ImageUri =
    "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=3775&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <ScrollView>
      <Carousal />
      <View style={styles.cards_title_container}>
        <Text style={styles.cards_title}>Cards</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.cards_container}>
          <Cards imageUri={ImageUri} btnTitle="action" />
          <Cards imageUri={ImageUri} btnTitle="action" />
          <Cards imageUri={ImageUri} btnTitle="action" />
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cards_container: {
    flexWrap: "wrap",
    padding: 10,
    marginBottom: 20,
    gap: 10,
    flexDirection: "row",
  },
  cards_title_container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  cards_title: {
    fontSize: 30,
    fontWeight: "600",
  },
});
