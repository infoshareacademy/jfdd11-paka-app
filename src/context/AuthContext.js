import React, { Component } from 'react';
import firebase from 'firebase'

export const AuthContext = React.createContext({ user: null });
const { Provider, Consumer }= Auth.Context;

export default class AuthContextProvider extends Component {
    state = {
        user: null,
        signOut: () => firebase.auth().signOut(),
        signIn: (email, password) => firebase.auth() 
    }
}