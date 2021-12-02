import React from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import db from '../config';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class ReadStory extends React.Component{
    constructor(){
        super();
        this.state = {
            allStories: [],
            dataSource: [],
            search: '',
            lastVisibleStory: null
        }
    }

    componentDidMount(){
        this.getStories();
    }

    getStories = async () => {
        try{
            var allStories = [];
            var lastVisibleStory = null;
            db.collection('stories').limit(10).get().then(
                (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        allStories.push(doc.data());
                        lastVisibleStory = doc;
                    })
                    this.setState({allStories, lastVisibleStory});
                }
            )
        }
        catch(error){
            console.log(error);
        }
    }

    SearchFilterFunction(text){
        const newData = this.state.allStories.filter((item)=> {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
    
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
          dataSource: newData,
          search: text,
        });
    }

    render(){
        return(
            <SafeAreaProvider>
                <View style={styles.container}>
                    <Header 
                        backgroundColor = {'orange'}
                        centerComponent = {{
                            text : 'Bed Time Stories',
                            style : { color: 'white', fontSize: 20, fontWeight: '900' }
                        }}
                    />
                    <View style={{height: 20, width: '100%'}}>
                        <SearchBar
                            style={{}}
                            placeholder='Type Here...'

                            onChangeText={(text) => {
                                this.SearchFilterFunction(text);
                            }}
                            value={this.state.search}
                        />
                    </View>

                    <FlatList
                        style={{marginTop: 45}}
                        data={this.state.search == '' ? this.state.allStories : this.state.dataSource}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text> Title: {item.title}</Text>
                                <Text> Author: {item.author}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index)=>{index.toString()}}
                    />
                </View>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    item: {
      backgroundColor: 'pink',
      padding:10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    itemContainer: {
      height: 80,
      width:'100%',
      borderWidth: 2,
      borderColor: 'pink',
      justifyContent:'center',
      alignSelf: 'center',
    }
});