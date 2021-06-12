import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ViewProfile from './components/ViewProfile';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Signup" component={Signup} />
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="ViewProfile" component={ViewProfile} />
      <RootStack.Screen name="UpdateProfile" component={UpdateProfile} />
      <RootStack.Screen name="Profile" component={Profile} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
