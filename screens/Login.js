import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import firebase from "firebase";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    showAlert(errorCode){
        switch(errorCode){
          case 'auth/too-many-requests':
            Alert.alert('To many requests, Try again later')
            this.setState({
              email:"",
              password : ""
            })
            break
          case 'auth/wrong-password':
            Alert.alert('Enter Correct password')
            this.setState({
              password : ""
            })
            break;
        }
    }

    login = async(email, password)=>{
      if(email && password){
        try{
          const response = await firebase.auth().signInWithEmailAndPassword(email, password);
          if(response){
            this.props.navigation.navigate("Write Story");
          }
        }
        catch(error){
          switch(error.code){
            case 'auth/user-not-found':
              alert("User doesn't exist");
            break;
            case 'auth/invalid-email':
              alert("Incorrect E-mail");
            break;
            case 'auth/invalid-password':
              alert('Incorrect Password');
            break;
          }
        }
      }
    }

    render(){
        return(
          <View style={styles.container}>
    
            <View style={styles.subContainer1}>
              <Text style={styles.title}>Bedtime Stories</Text>
              <Image source = { require("../assets/Login.png")} style={styles.image} />
              <TextInput
                  placeholder="abc@gmail.com"
                  placeholderTextColor = "#000"
                  onChangeText= {(emailText)=>{
                      this.setState({
                          email: emailText
                      })
                  }}
                  value={this.state.email}
                  style={styles.textInput}
                  />
              <TextInput
                  placeholder="Password"
                  placeholderTextColor = "#000"
                  onChangeText= {(passwordText)=>{
                      this.setState({
                          password: passwordText
                      })
                  }}
                  value={this.state.password}
                  style={styles.textInput}
                  secureTextEntry = {true}
                  />
            </View>
            <View style={styles.subContainer2}>
              <TouchableOpacity
                style={styles.button}
                onPress = {()=>{
                  this.login(this.state.email, this.state.password)
                }}
                >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
    
            </View>
          </View>
        )
      }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#fff'
    },
    title:{
      fontWeight:"normal",
      fontSize:43,
      padding:25,
      color:'#000'
    },
    image:{
      width:"60%",
      height:"40%",
      marginBottom:30,
      borderWidth:3,
      borderColor:'grey',
      borderRadius:20
    },
    subContainer1:{
      flex:0.6,
      justifyContent:'center',
      alignItems:'center'
    },
    subContainer2:{
      flex:0.4,
      alignItems:'center'
    },
    textInput : {
      width:"70%",
      height: "8%",
      borderWidth:2,
      borderColor:'#000',
      padding:10,
      marginBottom:10,
      borderRadius:10
    },
    button:{
      width:"75%",
      height:"11%",
      justifyContent:'center',
      alignItems:'center',
      borderWidth:2,
      borderColor:'green',
      borderRadius:15,
      backgroundColor: 'lightgreen'
    },
    buttonText:{
      color:'#000',
      fontSize:25
    }
  })