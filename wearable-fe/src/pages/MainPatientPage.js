import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {Card} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import {ProgressCircle} from 'react-native-svg-charts';

const MainPacientPage = () => {
  const temperature = '36.6°C';
  const humidity = '45%';
  const pulse = 72;
  const ecgData = [72, 75, 78, 74, 73, 76];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Card style={styles.card}>
        <Text style={styles.title}>Date in timp real</Text>
        <View style={styles.bodyContainer}>
          <Image
            source={require('../../public/si.png')}
            style={styles.bodyImage}
          />
          <View style={styles.statsContainer}>
            <Text style={styles.label}>Puls</Text>
            <ProgressCircle
              style={styles.progressCircle}
              progress={pulse / 100}
              progressColor={'#E23F44'}
              startAngle={-Math.PI * 0.8}
              endAngle={Math.PI * 0.8}
            />
            <Text style={styles.value}>{pulse} bpm</Text>
          </View>
        </View>
        <View>
          <Text style={styles.label}>ECG</Text>
          <LineChart
            data={{
              labels: ['1', '2', '3', '4', '5', '6'],
              datasets: [
                {
                  data: ecgData,
                },
              ],
            }}
            width={Dimensions.get('window').width - 80} // Adjusted to fit within the card
            height={220}
            chartConfig={{
              backgroundColor: '#E3F2FD',
              backgroundGradientFrom: '#E3F2FD',
              backgroundGradientTo: '#E3F2FD',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(13, 71, 161, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginLeft: -10,
            }}
          />
        </View>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.title}>Date incapere</Text>
        <View style={styles.bodyContainer}>
          <Image
            source={require('../../public/house.png')}
            style={styles.bodyImage}
          />
          <View style={styles.statsContainer}>
            <Text style={styles.label}>Temperatură</Text>
            <Text style={styles.value}>{temperature}</Text>
            <Text style={styles.label}>Umiditate</Text>
            <Text style={styles.value}>{humidity}</Text>
          </View>
        </View>
      </Card>
      <Text style={styles.title}></Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  statsContainer: {
    marginLeft: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#0D47A1',
    marginBottom: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  progressCircle: {
    height: 100,
    width: 100,
  },
});

export default MainPacientPage;
