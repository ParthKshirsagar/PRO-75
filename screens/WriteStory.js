import React from 'react';
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, TextInput } from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class WriteStory extends React.Component{
    constructor(){
        super();
        this.state = {
            title: '',
            author: '',
            story: ''
        }
    }

    submitStory = async () => {
        db.collection('stories').add({
            title: this.state.title,
            author: this.state.author,
            story: this.state.story
        });

        this.setState({
            title: '',
            author: '',
            story: ''
        });
        ToastAndroid.show('Your story has been submitted', ToastAndroid.SHORT);
    }

    render(){
        {console.disableYellowBox = true}
        return(
            <SafeAreaProvider>
                <KeyboardAvoidingView style={styles.container}
                    behavior='padding' enabled>
                        <Header 
                            backgroundColor='orange'
                            centerComponent={{
                                text: 'Bed Time Stories',
                                style: { color: '#fff', fontSize: 30, fontWeight: 'bold' }
                            }}
                        />
                        <TextInput 
                            placeholder="Story Title"
                            onChangeText= {(text)=>{
                                this.setState({
                                    title: text
                                })
                            }}
                            value={this.state.title}
                            style={styles.title}
                            placeholderTextColor='black'
                        />
                        <TextInput
                            placeholder="Author"
                            onChangeText= {(text)=>{
                                this.setState({
                                    author: text
                                })
                            }}
                            value={this.state.author}
                            style={styles.author} 
                            placeholderTextColor='black'
                        />
                        <TextInput 
                            placeholder="Write your story"
                            onChangeText= {(text)=>{
                                this.setState({
                                    story: text
                                })
                            }}
                            value={this.state.story}
                            style={styles.storyText}
                            multiline={true}
                            placeholderTextColor='black'    
                        />

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={this.submitStory}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title:{
        height: 40,
        borderWidth: 2,
        marginTop: 40,
        padding: 10,
        paddingLeft: 15,
        margin: 10,
        borderRadius: 20
    },
    author: {
        height: 40,
        borderWidth: 2,
        padding: 10,
        paddingLeft: 15,
        margin:10,
        borderRadius: 20
    },
    storyText: {
        height: 250,
        borderWidth: 2,
        margin: 10,
        padding: 15,
        paddingTop: 13,
        borderRadius: 20
    },
    submitButton:{
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#F4C430',
        borderRadius: 20,
        width: 120,
        height: 40,
        marginTop: 15
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '900',
        fontSize: 18
    }
});