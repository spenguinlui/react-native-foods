import React from 'react';
// import { StyleSheet } from 'react-native';
import Router from './src/route'

// redux
import configureStore from './src/redux/store'
import { StoreContext } from 'redux-react-hook'
const store = configureStore();

function MyApp() {
  return (
    <Router />
  );
}

export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <MyApp />
    </StoreContext.Provider>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
