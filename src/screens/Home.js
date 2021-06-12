import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {getAllUser} from '../helper/profile';

const Item = ({name, phone, navigation, profile, user}) =>
  user._id !== profile.user._id ? (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ViewProfile', {
          name: name,
          age: profile.age,
          email: profile.user.email,
          degree: profile.degree,
          profession: profile.profession,
          phone: phone,
        })
      }>
      <View style={styles.item}>
        <Text style={styles.title}>
          <Text style={{fontSize: 20}}>Name:</Text> {name}
        </Text>
        <Text style={styles.title}>
          <Text style={{fontSize: 20}}>Phone:</Text>{' '}
          {phone === '' ? <Text>Not given</Text> : phone}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <View></View>
  );

const Home = ({navigation}) => {
  const [profiles, setProfiles] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
    getProfile();
    getUser();
  }, []);

  const getProfile = () => {
    setLoading(true);
    getAllUser()
      .then(result => {
        if (!result) {
          setLoading(false);
          Alert.alert('Error', 'Error in network');
          return;
        }
        if (result.error) {
          setLoading(false);
          Alert.alert('Error', result.message);
          return;
        }
        setProfiles(result.profile);
        setLoading(false);
        // getUsers();
      })
      .catch(err => console.log(err));
  };

  return loading ? (
    <ActivityIndicator size="large" color="black" />
  ) : (
    <ScrollView style={{flex: 1}}>
      <Header header="User Profile App" navigation={navigation} />
      <View style={styles.container}>
        {profiles !== null && user !== null ? (
          profiles.map(profile => {
            return (
              console.log(profile.user.name),
              (
                <Item
                  navigation={navigation}
                  profile={profile}
                  user={user}
                  name={profile.user.name}
                  phone={profile.phone_number}
                  key={profile._id}
                />
              )
            );
          })
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text>No Users Found</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
  },
});
