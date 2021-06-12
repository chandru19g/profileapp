import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('screen');

const Splash = () => {
  return (
    <LinearGradient
      colors={['#1E96FC', '#6798C0', '#3F37C9']}
      style={styles.splashContainer}>
      <View style={styles.splashTextContainer}>
        <Text style={styles.splashText}>User Profile App</Text>
      </View>
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: 'center',
  },
  splashTextContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashText: {
    fontSize: 32,
    fontWeight: '500',
    color: '#FFF',
  },
});
