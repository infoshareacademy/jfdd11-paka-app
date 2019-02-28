import React, { Component } from 'react';
import firebase from 'firebase';

// The argument passed to `createContext` is being used only
// if given context provider is not available within VDOM
// tree above the Consumer.
export const AuthContext = React.createContext({ user: null });
const { Provider, Consumer } = AuthContext;

export default class AuthContextProvider extends Component {
  state = {
    user: null,
    signOut: () => firebase.auth().signOut(),
    signIn: (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)
  };

  componentDidMount() {
    this.unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => 
        this.setState({ user })
      );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

// HOC - Higher Order Component
export const withAuth = Component => props => (
  <Consumer>
    {(value) => (
      <Component {...props} authContext={value} />
    )}
  </Consumer>
);