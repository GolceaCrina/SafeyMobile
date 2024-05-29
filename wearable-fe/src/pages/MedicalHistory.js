import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

const MedicalHistory = ({route}) => {
  const {userId} = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://172.20.10.2:3000/date-medicale`, {
          credentials: 'include',
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Istoricul tau medical</Text>
      </View>
      <Image
        source={require('../../public/medicalhis.png')} // Actualizează calea către imaginea ta
        style={styles.image}
      />
      {data.map((item, index) => (
        <View key={index} style={styles.infoContainer}>
          <InfoRow label="Istoric Medical" value={item.IstoricMedical} />
          <InfoRow label="Alergii" value={item.Alergii} />
          <InfoRow
            label="Consultatii Cardiologice"
            value={item.ConsultatiiCardiologice}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const InfoRow = ({label, value}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={styles.infoBox}>
      <Text style={styles.infoText}>{value}</Text>
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
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 330,
    marginBottom: 20,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoRow: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: '#00796B',
    marginBottom: 5,
  },
  infoBox: {
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
    fontSize: 16,
    color: '#004D40',
  },
});

export default MedicalHistory;
