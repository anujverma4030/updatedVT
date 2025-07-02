import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainStackNavigator from './src/navigation/MainStackNavigator';
import { store } from './src/redux/store';
import { loadToken } from './src/redux/slices/authSlice';

// 👇 This component is safe to use hooks like useDispatch
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadToken());
  }, []);

  return <MainStackNavigator />;
};

const App = () => {
  return (
  
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
   
  );
};

export default App;

const styles = StyleSheet.create({});
