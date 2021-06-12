import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {loginHelper} from '../helper/auth';

const {height, width} = Dimensions.get('screen');

const Login = ({navigation}) => {
  const [input, setInput] = useState({email: '', password: ''});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      if (value !== null) {
        setUser(value);
        navigation.replace('Home');
      } else {
        setUser(null);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  const setLocalStorage = async value => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(value));
    } catch (error) {}
  };

  const loginListener = () => {
    setLoading(true);
    if (input.email.length < 0 || input.password.length < 0) {
      setLoading(false);
      Alert.alert('All fields must be filled');
      return;
    }
    loginHelper(input)
      .then(result => {
        if (!result) {
          setLoading(false);
          Alert.alert('Error', 'Error in network');
          return;
        }
        if (result.error) {
          setLoading(false);
          setInput({...input, email: '', password: ''});
          Alert.alert('Error', result.messsage);
          return;
        }
        console.log(result);
        setLocalStorage(result.user);
        setLoading(false);
        navigation.replace('Home');
      })
      .catch(err => {});
  };

  return loading ? (
    <ActivityIndicator size="large" color="black" />
  ) : (
    <ScrollView style={{flex: 1}}>
      <LinearGradient
        colors={['#4895EF', '#4CC9F0']}
        style={styles.HeaderContainer}>
        <View style={styles.container}>
          <Text style={styles.HeaderText}>Login</Text>
        </View>
      </LinearGradient>
      <View style={styles.Body}>
        <View style={styles.BodyHeader}>
          <Text style={styles.BodyHeaderText}>Welcome</Text>
        </View>
        <View style={styles.BodyContainer}>
          <View style={styles.BodySection}>
            <TextInput
              placeholder="Email-id"
              autoCapitalize="none"
              placeholderTextColor="grey"
              onChangeText={e => setInput({...input, email: e})}
              style={styles.BodyInput}
            />
          </View>
          <View style={styles.BodySection}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="grey"
              onChangeText={e => setInput({...input, password: e})}
              style={styles.BodyInput}
              secureTextEntry
            />
          </View>
          <View style={styles.BodySectionButton}>
            <View style={styles.ButtonSection}>
              <TouchableOpacity
                onPress={loginListener}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.BodyButton}>Let's Go</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.BodyFooter}>
              Don't Have an account?{' '}
              <Text
                style={{color: 'red'}}
                onPress={() => navigation.navigate('Signup')}>
                Create Here!!
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height / 3,
    width: width,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  HeaderContainer: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  HeaderText: {
    fontSize: 35,
    fontWeight: '700',
  },
  Body: {
    flex: 1,
  },
  BodyHeader: {
    alignContent: 'center',
    alignItems: 'center',
  },
  BodyHeaderText: {
    fontSize: 25,
  },
  BodyContainer: {
    margin: 5,
  },
  BodySection: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  BodyInput: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    color: '#000',
    fontSize: 16,
  },
  BodySectionButton: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 30,
  },
  ButtonSection: {
    width: '50%',
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30,
  },
  BodyButton: {
    fontSize: 22,
    color: '#FFF',
  },
  BodyFooter: {
    fontSize: 18,
    paddingTop: 5,
  },
});
