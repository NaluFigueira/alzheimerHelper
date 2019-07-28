import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './assets/componentes/Home'

export default function App() {
  return (
    <Home></Home>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
