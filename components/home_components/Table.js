import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView, Pressable, Button, KeyboardAvoidingView, TextInput } from "react-native";
import axios from "axios";

const auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjVkMmY2YmU0ZjgxNTBiODM0ODhhNjAxIn0sImlhdCI6MTcwODMyNDY2OH0.1oxl2nf605vwKdTOPslh4NOY1A3GO-t9BDqguu8EDxI";

const API_URL = "https://basic-api-z0e9.onrender.com/";

// Round Edit and delete button
function RoundButtons ( props ) {
    return (

      <View style={[styles.roundbtnContainer,{backgroundColor:`${props.color}`},props.style]}>
        <Pressable onPress={props.onClick}>
          <Text>{props.text}</Text>
        </Pressable>
      </View>

    );
}




export default function Table() {
  // Visible to show and hide add data form
  const [visible,setVisible] = useState(false);
  
  // Data
  const [Data, setData] = useState(null);
  
  // State To show and hide edit and delete btn
  const [display,setDisplay] = useState(false);

  // if to display edit and delete button and hide it after some time
  if (display === true){
    setTimeout(() => {
      setDisplay(false);
    },5000);
  }

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const res = await axios({
        url: `${API_URL}data/get`,
        method: "GET",
        headers: {
          "auth-token": auth_token,
        },
      });

      // const res = await axios("https://jsonplaceholder.typicode.com/users");
      setData(res.data.data);
      // console.log(res);
    } catch (errors) {
      console.log(errors);
    }
  };


  // Common Error State to show error to user

  const [errors,setError] = useState();

  // Form

  // Data state for add data form
  const [firstName,setFirstname] = useState("");
  const [lastName,setLastname] = useState("");
  const [position,setPosition] = useState("");


  // form Submit
  const handleSubmit = async () => {
      try {

          const uploadData = {
              firstName:firstName,
              lastName:lastName,
              position:position
          };
          
          const res = await axios({
            url: `${API_URL}data/add`,
            method: "POST",
            headers: {
              "auth-token": auth_token,
            },
            data: uploadData,
          });
    
          if (res.data.type === "success"){
            setFirstname("");
            setLastname("");
            setPosition("");
            FetchData();
            setError(null);
            setVisible(false);
          }
          else{
            setError(res.data.error);
          }
        } catch (errors) {
          console.log(errors);
        }
  };


  // To Close Add Data Form
  const closeAdd = () => {
    setFirstname("");
    setLastname("");
    setPosition("");
    setError(null);
    setVisible(false);
  }



  // To delete an Entry

  const handleDelete = async (id) => {
    try{

      const res = await axios({
        url:`${API_URL}data/del/${id}`,
        method:"DELETE",
        headers:{
          "auth-token": auth_token,
        }
      });

      if (res.data.type === "success"){
        const newData = [...Data].filter((e) => {
          return e._id != id
        });
        setError(null);
        setData(newData);
      }else{
        setError(res.data.error)
      }

    }catch(err){
      console.log(err);
    }
  }


  // To Edit Any Post

  const [updateVisible,setUpdateVisible] = useState(false);
  const [editid,setEditid] = useState();

  // Function to show and hide edit form with values
  const ShowEdit = (id,f,l,p) => {

    setFirstname(f);
    setLastname(l);
    setPosition(p);
    setUpdateVisible(true);
    setEditid(id);
  }

  // functiom to handle edit request

  const handleEdit = async () => {
      const eData = {
        firstName:firstName,
        lastName:lastName,
        position:position
      };
      
      try{

        const res = await axios({
          url:`${API_URL}data/update/${editid}`,
          method:"PUT",
          headers:{
            "auth-token": auth_token,
        },
        data:eData
        });

        if (res.data.type === "success"){
          // FetchData();
          
          const newData = [...Data].filter((e) => {
            if (e._id === editid){
              e.firstName = firstName
              e.lastName = lastName
              e.position = position
            }
            return e._id
          });

          setData(newData);
          setError(null);
          setFirstname("");
          setLastname("");
          setPosition("");

          setUpdateVisible(false);
        }else{
          setError(res.data.error)
        }

  
      }catch(err){
        console.log(err);
      }
  }


  // To Close Edit Data Form

  const closeEdit = () => {
    setError(null);
    setUpdateVisible(false);
  }


  return (
    <>
    
    <View style={styles.table}>
      {/* Button to show add data form start */}
    <View style={{width:100, marginBottom:20, flexDirection:"row", gap:20, alignItems:"center"}}>
        <Button title="ADD DATA" onPress={() => setVisible(true)}/>
        <Button title="Refresh" onPress={FetchData} />
      </View>
    {/* Button to show add data form end */}

    {/* Table to Show Data start */}
    <Text style={{marginBottom:20, alignSelf:"center"}}>Click On Any Row to Show Edit And Delete Button</Text>
      <View style={styles.Header}>
        <Text style={[styles.header_text, styles.border]}>FirstName</Text>
        <Text style={[styles.header_text, styles.border]}>LastName</Text>
        <Text style={styles.header_text}>Position</Text>
      </View>
      <ScrollView>
        {/* Method 1: using FlatList. */}
        {/* {Data ? 
      <FlatList
      data={Data}
      renderItem={({ item }) => {
        return (
          <View style={styles.Content} key={item._id}>
            <Text style={{ flex: 1 }}>{item.firstName}</Text>
            <Text style={{ flex: 1 }}>{item.lastName}</Text>
            <Text style={{ flex: 1 }}>{item.position}</Text>
          </View>
        );
      }}
      /> : <Text>No Data Found</Text>} */}

      {/* Method 2: Using Map Functions */}
      {Data ? Data.map((item) => {
        return (
          <Pressable style={styles.Content} key={item._id} onPress={ () => setDisplay(true) } >
            <Text style={{ flex: 1, fontSize:18 }}>{item.firstName}</Text>
            <Text style={{ flex: 1, fontSize:18 }}>{item.lastName}</Text>
            <Text style={{ flex: 1, fontSize:18 }}>{item.position}</Text>
            <RoundButtons text="D" color="red" onClick={()=>handleDelete(item._id)} style={!display && styles.none }/>
            <RoundButtons text="E" color="lightblue" style={[!display && styles.none ,{marginRight:30}]} onClick={()=>ShowEdit(item._id,item.firstName,item.lastName,item.position)}/>
          </Pressable>
        );
      }) : <Text>No Data Found!</Text>}
      </ScrollView>
    {/* Table to Show Data end */}

      {/* add Data Form Conditional rendering Start */}
      {visible && <KeyboardAvoidingView behavior="padding" style={[styles.form_container]}>
      <View style={styles.form}>
          <Text style={styles.label}>Add FirstName : </Text>
          <TextInput placeholder="Enter FirstName" value={firstName} onChangeText={setFirstname} style={styles.input}/>

          <Text style={styles.label}>Add LastName : </Text>
          <TextInput placeholder="Enter LastName" value={lastName} onChangeText={setLastname} style={styles.input}/>

          <Text style={styles.label}>Add Position : </Text>
          <TextInput placeholder="Enter Position" value={position} onChangeText={setPosition} style={styles.input}/>
          {
            errors && <Text style={styles.error}>{errors}</Text>
          }
          <Button title="Submit" onPress={handleSubmit}/>
          <Pressable style={styles.form_cancel} onPress={closeAdd}>
            <Text style={{color:"white"}}>CANCEL</Text>
          </Pressable>
      </View>
  </KeyboardAvoidingView> }
      {/* add Data Form Conditional rendering end */}


      {/* Update Data Form Conditional rendering Start */}
      {updateVisible && <KeyboardAvoidingView behavior="padding" style={[styles.form_container]}>
      <View style={styles.form}>
          <Text style={styles.label}>Add FirstName : </Text>
          <TextInput placeholder="Enter FirstName" value={firstName} onChangeText={setFirstname} style={styles.input}/>

          <Text style={styles.label}>Add LastName : </Text>
          <TextInput placeholder="Enter LastName" value={lastName} onChangeText={setLastname} style={styles.input}/>

          <Text style={styles.label}>Add Position : </Text>
          <TextInput placeholder="Enter Position" value={position} onChangeText={setPosition} style={styles.input}/>
          {
            errors && <Text style={styles.error}>{errors}</Text>
          }
          <Button title="Submit" onPress={handleEdit}/>
          <Pressable style={styles.form_cancel} onPress={closeEdit}>
            <Text style={{color:"white"}}>CANCEL</Text>
          </Pressable>
      </View>
  </KeyboardAvoidingView> }
      {/* Update Data Form Conditional rendering end */}

    </View>
    </>
  );
}

const styles = StyleSheet.create({
  table: {
    width: "95%",
    alignSelf:"center"
  },
  Header: {
    width: "100%",
    height: 50,
    padding: 5,
    backgroundColor: "#B6D0E2",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header_text: {
    flex: 1,
    fontSize: 20,
  },
  border: {
    borderRightWidth: 2,
    borderRightColor: "black",
  },
  none:{
    display:"none"
  },
  Content: {
    display:"flex",
    width: "100%",
    padding: 5,
    flexDirection:"row",
    backgroundColor: "#F0FFFF",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    position:"relative"
  },
  roundbtnContainer:{
    width:20,
    height:20,
    borderRadius:50,
    elevation:20,
    position:"absolute",
    right:0,
    marginRight:5,
    alignItems:"center"
  },
  form_container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    elevation:50
},
form:{
    width:300,
    height:"auto",
    backgroundColor:"white",
    borderRadius:10,
    padding:20,
    elevation:20,
    shadowColor:"black",
    top:-150
},
label:{
    fontSize:12,
    color:"grey",
    marginBottom:3
},
input:{
    borderWidth:1,
    borderColor:"black",
    padding:5,
    borderRadius:5,
    marginBottom:8
},
form_cancel:{
  width:100,
  marginTop:10,
  padding:6,
  alignItems:"center",
  backgroundColor:"#E34234",
  elevation:20,
  shadowColor:"black",
  borderRadius:2
},
error:{
  fontSize:15,
  fontWeight:"500",
  color:"red",
  marginBottom:10
}
});
