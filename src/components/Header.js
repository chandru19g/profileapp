import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Header = ({navigation, header}) => {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      if (value === null) {
        setUser(value);
        navigation.replace('Signup');
      } else setUser(JSON.parse(value));
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const _signOut = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      getUser();
    } catch (error) {}
  };

  return (
    <View style={styles.conatiner}>
      <View style={styles.header}>
        {header === 'User Profile App' ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', {
                name: user.name,
                id: user._id,
                email: user.email,
              })
            }>
            <Image
              source={require('../assests/Profile.png')}
              style={{...styles.ProfileImg}}
            />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            color: '#FFF',
            backgroundColor: '#4895EF',
          }}>
          {header}
        </Text>
        {header === 'User Profile App' ? (
          <TouchableOpacity onPress={() => _signOut()}>
            <Image
              source={require('../assests/logout.png')}
              style={{
                ...styles.ProfileImg,
                height: 30,
                width: 30,
                tintColor: '#FFF',
              }}
            />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#4895EF',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomWidth: 0.7,
  },
  ProfileImg: {
    height: 40,
    width: 40,
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
});
