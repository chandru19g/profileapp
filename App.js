import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RootStackScreen from './src/RootStackScreen';
import Splash from './src/screens/Splash';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  if (loading) return <Splash />;

  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
