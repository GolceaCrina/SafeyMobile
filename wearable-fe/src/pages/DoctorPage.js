// screens/HomeScreen.js
import React from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';

const patients = [
  {id: '1', name: 'John Doe'},
  {id: '2', name: 'Jane Smith'},
];

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.patientItem}>
            <Text style={styles.patientName}>{item.name}</Text>
            <Button
              title="View Details"
              onPress={() =>
                navigation.navigate('PatientDetails', {patientId: item.id})
              }
              color="#4A90E2"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F7',
  },
  patientItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  patientName: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default HomeScreen;
