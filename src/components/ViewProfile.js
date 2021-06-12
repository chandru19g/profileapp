import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Header from './Header';

const ViewProfile = ({route}) => {
  const {name, age, profession, degree, email, phone} = route.params;

  return (
    <View style={{flex: 1}}>
      <Header header="View Profile" />
      <View
        style={{
          backgroundColor: '#FFF',
          justifyContent: 'center',
          margin: 10,
          padding: 20,
          borderRadius: 20,
        }}>
        <Text style={styles.ContainerText}>Name: {name}</Text>
        <Text style={styles.ContainerText}>
          Age: {age === '' ? <Text>Not Mentioned</Text> : age}
        </Text>
        <Text style={styles.ContainerText}>
          E-mail: {email === '' ? <Text>Not Mentioned</Text> : email}
        </Text>
        <Text style={styles.ContainerText}>
          Degree: {degree === '' ? <Text>Not Mentioned</Text> : degree}
        </Text>
        <Text style={styles.ContainerText}>
          Profession:{' '}
          {profession === '' ? <Text>Not Mentioned</Text> : profession}
        </Text>
        <Text style={styles.ContainerText}>
          Phone NO: {phone === '' ? <Text>Not Mentioned</Text> : phone}
        </Text>
      </View>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  ContainerText: {
    fontSize: 18,
  },
  ContainerChat: {
    flex: 1,
  },
  ContainerFooter: {
    justifyContent: 'flex-end',
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 4,
  },
});
