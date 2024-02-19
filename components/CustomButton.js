import { StyleSheet, View, Text, TouchableHighlight } from "react-native";


export default function CustomButton( props ) {
    return (
        <TouchableHighlight onPress={props.onpress} style={styles.Customebutton}>
            <View>
                <Text style={styles.Button_title}>{props.title}</Text>
            </View>
        </TouchableHighlight>
      )
}


const styles = StyleSheet.create({
    Customebutton:{
        height:"100%",
        justifyContent:"center",
        alignSelf:"flex-start",
        backgroundColor:"#89CFF0"
    },
    Button_title:{
        fontSize:20
    }
})