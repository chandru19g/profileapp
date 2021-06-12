import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import {updateUserProfile} from '../helper/profile';

const {width} = Dimensions.get('window');

const UpdateProfile = ({route, navigation}) => {
  const {id} = route.params;
  const [input, setInput] = useState({
    age: '',
    phone_number: '',
    degree: '',
    profession: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);

  const updateUser = () => {
    setLoading(true);
    updateUserProfile(id, input)
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
        Alert.alert('Profile Updated');
        navigation.replace('Home');
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <View>
      <Header header="Update Profile" />
      <View
        style={{
          padding: 10,
          width: width,
        }}>
        <View
          style={{
            backgroundColor: '#FFF',
            margin: 10,
            justifyContent: 'center',
            padding: 10,
          }}>
          <TextInput
            placeholder="Age"
            placeholderTextColor="grey"
            onChangeText={e => {
              console.log(e);
              setInput({...input, age: e});
            }}
            style={styles.BodyInput}
          />
          <TextInput
            placeholder="Degree"
            placeholderTextColor="grey"
            onChangeText={e => {
              console.log(e);
              setInput({...input, degree: e});
            }}
            style={styles.BodyInput}
          />
          <TextInput
            placeholder="Company"
            placeholderTextColor="grey"
            onChangeText={e => {
              console.log(e);
              setInput({...input, company: e});
            }}
            style={styles.BodyInput}
          />
          <TextInput
            placeholder="Profeesion"
            placeholderTextColor="grey"
            onChangeText={e => {
              console.log(e);
              setInput({...input, profession: e});
            }}
            style={styles.BodyInput}
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="grey"
            onChangeText={e => {
              console.log(e);
              setInput({...input, phone_number: e});
            }}
            style={styles.BodyInput}
          />
          <TouchableOpacity
            onPress={() => updateUser()}
            style={{
              backgroundColor: '#2196F3',
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              padding: 10,
            }}>
            <Text style={{fontSize: 18, color: '#FFF'}}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  BodyInput: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    color: '#000',
    fontSize: 16,
  },
});
