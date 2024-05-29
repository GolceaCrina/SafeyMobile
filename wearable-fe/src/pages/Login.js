import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Sending login request', {username, password});

    try {
      const response = await fetch('http://172.20.10.2:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });
      console.log('Response received:', response);
      const result = await response.json();
      console.log('Result:', result);

      if (response.ok) {
        Alert.alert('Success', 'Login successful');
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('userId', result.userId.toString());
        await AsyncStorage.setItem('userType', result.userType);

        navigation.navigate('MedicalHistory', {
          userId: result.userId,
          userType: result.userType,
        });
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error during login request:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Image
              source={require('../../public/logo.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Autentificare</Text>
            <TextInput
              style={styles.input}
              placeholder="Nume"
              placeholderTextColor="#757575"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Parolă"
              secureTextEntry
              placeholderTextColor="#757575"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Autentificare</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              Nu ai cont?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('SignUp')}>
                Înregistrează-te
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    color: '#0D47A1',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#000',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0D47A1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  text: {
    color: '#757575',
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    color: '#0D47A1',
    fontWeight: 'bold',
  },
});

export default Login;
