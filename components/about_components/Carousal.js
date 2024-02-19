import { Image, StyleSheet, View } from 'react-native'

export default function Carousal() {
    const ImageUri = "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=3775&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <View style={styles.carousal}>
        <Image source={{uri:ImageUri}} style={styles.Carousal_image}/>
    </View>
  )
}


const styles = StyleSheet.create({
    carousal:{
        width:"100%",
        height:200,
        opacity:0.7,
        backgroundColor:"black"
    },
    Carousal_image:{
        width:"100%",
        height:200
    }
})