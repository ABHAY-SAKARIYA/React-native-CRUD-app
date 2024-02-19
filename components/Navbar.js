import { SafeAreaView, StyleSheet, View } from "react-native";
import CustomButton from "./CustomButton";


export default function Navbar( props ) {
    
    return (
        <View style={styles.navbar}>
            <CustomButton title="Home" onPress={()=>props.navigation.navigate("HomePage")} />
            <CustomButton title="About" onPress={() => props.navigation.navigate("About")} />
        </View>

    )
}


const styles = StyleSheet.create({
    navbar: {
        width: "100%",
        height: 60,
        backgroundColor: "#89CFF0",
        flexWrap:"wrap",
        alignContent:"space-between",
        paddingLeft:20,
        paddingRight:20,
    }
})