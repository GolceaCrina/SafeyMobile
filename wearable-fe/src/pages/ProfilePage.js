import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = ({route, navigation}) => {
  const {userId, userType} = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://172.20.10.2:3000/data?userId=${userId}&userType=${userType}`,
          {
            credentials: 'include',
          },
        );
        const text = await response.text();
        console.log('Server response:', text);
        const result = JSON.parse(text);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigation.navigate('Login');
      }
    };

    fetchData();
  }, [userId, userType, navigation]);

  const handleLogout = async () => {
    try {
      await fetch('http://172.20.10.2:3000/logout', {
        method: 'POST',
        credentials: 'include',
      });
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userType');
      navigation.navigate('WelcomeScreen');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profilul tau</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                userType === 'Pacienti'
                  ? require('../../public/patient.png')
                  : require('../../public/doctor.png')
              }
              style={styles.avatar}
            />
          </View>
          {userType === 'Pacienti' ? (
            <>
              <Text
                style={styles.nameText}>{`${data.Nume} ${data.Prenume}`}</Text>
              <Text style={styles.roleText}>{`Varsta: ${data.Varsta}`}</Text>
            </>
          ) : (
            <>
              <Text style={styles.nameText}>{data.Username}</Text>
              <Text style={styles.roleText}>
                {data.Specializare || 'No Specialisation'}
              </Text>
            </>
          )}
        </View>
        <View style={styles.infoContainer}>
          {userType === 'Pacienti' ? (
            <>
              <InfoRow label="CNP" value={data.CNP} />
              <InfoRow label="Adresa" value={data.Adresa} />
              <InfoRow label="Numar de telefon" value={data.NumarTelefon} />
              <InfoRow label="Email" value={data.Email} />
              <InfoRow label="Profesia" value={data.Profesie} />
              <InfoRow label="Locul de munca" value={data.LocMunca} />
            </>
          ) : (
            <>
              <InfoRow
                label="Specializare"
                value={data.Specializare || 'Fara specializare'}
              />
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const InfoRow = ({label, value}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={styles.infoBox}>
      <TextInput style={styles.infoText} value={value} editable={false} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  header: {
    backgroundColor: '#00796B',
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  logoutButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -40,
  },
  avatarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40',
  },
  roleText: {
    fontSize: 16,
    color: '#00796B',
  },
  infoContainer: {
    padding: 20,
  },
  infoRow: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#004D40',
    marginBottom: 5,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: '#004D40',
  },
});

export default ProfilePage;
