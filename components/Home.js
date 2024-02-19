import { Button, ScrollView, Text, View } from "react-native";
import Table from "./home_components/Table";

export default function Home({ navigation }) {
  return (
    <View>
      <View style={{ width: 100, height: 50, margin: 10 }}>
        <Button
          title="ABOUT"
          onPress={() => navigation.navigate("ABOUT")}
        ></Button>
      </View>
      <ScrollView>
        <Table />
      </ScrollView>
    </View>
  );
}
