import { Button, Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";

export default function Cards( props ) {

    return (
        <View style={styles.card}>
            <View>
                <Image source={{ uri: props.imageUri }} style={styles.card_image} />
            </View>
            <View style={styles.card_text}>
                <Text style={styles.text_heading}>{props.heading ? props.heading : "Heading"}</Text>
                <Text>
                    {props.desc ? props.desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eligendi laborum...." }            
                </Text>
                <View style={styles.card_btn}>
                    <Button title={props.btnTitle} onPress={props.btnOnPress} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        width: 200,
        height: 300,
        backgroundColor: "#F9F6EE",
        borderRadius: 10,
        overflow: "hidden",
        elevation: 5
    },
    card_image: {
        width: "100%",
        height: 120,
        marginBottom: 5
    },
    card_text: {
        width: "90%",
        height: "100%",
        textAlign: "justify",
        marginLeft: 10
    },
    text_heading: {
        fontSize: 25,
        fontWeight: "600",
        marginBottom: 10,
    },
    card_btn: {
        marginTop: 20
    }
})
