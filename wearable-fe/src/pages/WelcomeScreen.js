import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../public/medical.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Bun venit</Text>
        <Text style={styles.text}>
          Monitorizează-ți sănătatea cu tehnologia noastră purtabilă. Primește
          alerte în timp real și rămâi conectat cu medicul tău.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Autentificare</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonTextOutline}>Înregistrare</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  header: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    color: '#0D47A1',
    fontSize: 26,
    fontWeight: 'bold',
  },
  text: {
    color: '#757575',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0D47A1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0D47A1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonTextOutline: {
    color: '#0D47A1',
    fontSize: 18,
  },
});

export default WelcomeScreen;
