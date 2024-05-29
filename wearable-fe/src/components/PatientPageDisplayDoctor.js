import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const medicalHistory = [
  {date: '2023-01-01', description: 'Annual Checkup'},
  {date: '2023-06-15', description: 'Blood Test'},
];

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const PatientDetailsScreen = ({route}) => {
  const {patientId} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Medical History</Text>
      {medicalHistory.map((entry, index) => (
        <View key={index} style={styles.historyItem}>
          <Text style={styles.historyDate}>{entry.date}</Text>
          <Text style={styles.historyDescription}>{entry.description}</Text>
        </View>
      ))}

      <Text style={styles.header}>Progress Chart</Text>
      <LineChart
        data={chartData}
        width={320}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#4A90E2',
          backgroundGradientTo: '#4A90E2',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#4A90E2',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#4A90E2',
  },
  historyItem: {
    padding: 10,
    backgroundColor: '#FFF',
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyDescription: {
    fontSize: 16,
  },
});

export default PatientDetailsScr;
