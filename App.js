import React from "react";
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';

import WriteStory from "./screens/WriteStory";
import ReadStory from "./screens/ReadStory";
import Login from "./screens/Login";

export default class App extends React.Component{
  render(){
    return(
      
      <AppContainer />
      
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  "Write Story": WriteStory,
  "Read Story": ReadStory
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      if(routeName === "Write Story"){
        return(
          <Image
          source={require("./assets/write.png")}
          style={{width:40, height:40}}
        />
        )

      }
      else if(routeName === "Read Story"){
        return(
          <Image
          source={require("./assets/read.png")}
          style={{width:40, height:40}}
        />)

      }
    }
  })
})

const SwitchNavigator = createSwitchNavigator({
  LoginScreen: Login,
  TabNavigator: TabNavigator
})

const AppContainer = createAppContainer(SwitchNavigator);