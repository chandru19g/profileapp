import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {getUserProfileById} from '../helper/profile';
import Header from './Header';

const Profile = ({route, navigation}) => {
  const {name, id, email} = route.params;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    setLoading(true);
    getUserProfileById(id)
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
        setProfile(result.details);
        setLoading(false);
        // getUsers();
      })
      .catch(err => console.log(err));
  };

  return loading ? (
    <ActivityIndicator size="large" color="black" />
  ) : (
    <ScrollView style={{flex: 1}}>
      <Header header="User Profile" />
      {profile === null ? (
        <View></View>
      ) : (
        <View style={styles.Container}>
          <View style={styles.ContainerBody}>
            <Text style={{fontSize: 24}}>
              Name: <Text style={{color: 'grey'}}>{name}</Text>
            </Text>
            <Text style={{fontSize: 24}}>
              Email: <Text style={{color: 'grey'}}>{email}</Text>
            </Text>

            <Text style={{fontSize: 24}}>
              Age:{' '}
              <Text style={{color: 'grey'}}>
                {profile.age === '' ? <Text>Not Mentioned</Text> : profile.age}
              </Text>
            </Text>
            <Text style={{fontSize: 24}}>
              Mobile:{' '}
              <Text style={{color: 'grey'}}>
                {profile.phone_number === '' ? (
                  <Text>Not Mentioned </Text>
                ) : (
                  profile.phone_number
                )}
              </Text>
            </Text>
            <Text style={{fontSize: 24}}>
              Degree:{' '}
              <Text style={{color: 'grey'}}>
                {profile.degree === '' ? (
                  <Text>Not Mentioned</Text>
                ) : (
                  profile.degree
                )}
              </Text>
            </Text>
            <Text style={{fontSize: 24}}>
              Profession:{' '}
              <Text style={{color: 'grey'}}>
                {profile.profession === '' ? (
                  <Text>Not mentioned</Text>
                ) : (
                  profile.profession
                )}
              </Text>
            </Text>
            <Text style={{fontSize: 24}}>
              Company:{' '}
              <Text style={{color: 'grey'}}>
                {profile.company === '' ? (
                  <Text>Not mentioned</Text>
                ) : (
                  profile.company
                )}
              </Text>
            </Text>
            {console.log(id)}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('UpdateProfile', {id: id})}>
              <Text style={{fontSize: 16, color: '#FFF'}}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  ContainerBody: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  BodyInput: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    color: '#000',
    fontSize: 16,
  },
  button: {
    margin: 10,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 20,
  },
});
