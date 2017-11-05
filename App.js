
import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {Header, Button, CardSection, Spinner} from './src/components/common';
import LoginForm from './src/components/LoginForm';



export default class App extends Component{
  state = {
    loggedIn: null

  }
  componentWillMount(){
    firebase.initializeApp({
    apiKey: "AIzaSyB7DvwB2XcWB1QRDiM-B-OWxwdfYclCbpc",
    authDomain: "authenticaion-2d8b3.firebaseapp.com",
    databaseURL: "https://authenticaion-2d8b3.firebaseio.com",
    projectId: "authenticaion-2d8b3",
    storageBucket: "authenticaion-2d8b3.appspot.com",
    messagingSenderId: "48693478435"
    });

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({loggedIn:true})
      }else{
        this.setState({loggedIn: false})

     }
  })
  }

  renderContent(){

    switch (this.state.loggedIn) {
      case true:
      return (
        <CardSection>
        <Button onPress=
        {()=> firebase.auth().signOut()}>
        Log Out
        </Button>
        </CardSection>

      )

      case false:
         return <LoginForm />

      default:
        return (
          <CardSection>
          <Spinner size='large' />
          </CardSection>
        )
    }


  }
  render(){
    return(
      <View>
        <Header headerText="Authentication"/>
        {this.renderContent()}
      </View>

    )

  }

}
