import React from 'react';
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
} from 'react-native';

const SignUpScreen = ({navigation}) => {
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
            <Text style={styles.title}>Înregistrare</Text>
            <TextInput
              style={styles.input}
              placeholder="Nume"
              placeholderTextColor="#757575"
            />
            <TextInput
              style={styles.input}
              placeholder="Parolă"
              secureTextEntry
              placeholderTextColor="#757575"
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmă Parola"
              secureTextEntry
              placeholderTextColor="#757575"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Handle sign-up action
              }}>
              <Text style={styles.buttonText}>Înregistrare</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              Ai deja un cont?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('SignIn')}>
                Autentificare
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

export default SignUpScreen;
