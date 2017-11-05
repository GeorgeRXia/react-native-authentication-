import React, {Component} from 'react';
import {Text} from 'react-native'
import firebase from 'firebase';
import {Button, Card, CardSection, Input, Spinner} from './common';

export default class LoginForm extends Component{
  state = {email:'', password:'', error: '', loading: false }

  onButtonPress() {
    const {email, password } = this.state;

    this.setState({error: '', loading: true});

    firebase.auth().signInWithEmailAndPassword(email,password).then(this.onLoginSuccess.bind(this)).catch(
     () => { firebase.auth().createUserWithEmailAndPassword(email,password).then(this.onLoginSuccess.bind(this)).catch(      this.onLoginFail.bind(this))
    })

}
onLoginFail(){
this.setState({error: "Authentication Failed", loading:false});

}
onLoginSuccess() {
  this.setState({
    email: '',
    password:'',
    loading: false,
    error: ''

  });

}

renderButton(){
  if(this.state.loading){
    return <Spinner size="small" />

  }
   return <Button onPress={this.onButtonPress.bind(this)}> Log In  </Button>



}
  render() {
    return(
      <Card>
        <CardSection>
          <Input
          onChangeText={email => this.setState({email})}
          value={this.state.email}
          label="E-mail"
          placeholder="user@gmail.com"
          />
        </CardSection>

        <CardSection>
          <Input
          onChangeText={password => this.setState({password})}
          value={this.state.password}
          label="Password"
          placeholder="password"
          secureTextEntry
          />
        </CardSection>
          <Text style={styles.errorTextStyle}>
          {this.state.error}
          </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>

    )

  }


}

const styles = {
  errorTextStyle:{
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'

  }

}
