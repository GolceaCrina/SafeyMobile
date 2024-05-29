import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const BottomNavBar = ({userId, userType}) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MainPatientPage', {userId, userType})
        }>
        <Text style={styles.navItem}>Main</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfilePage', {userId, userType})}>
        <Text style={styles.navItem}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0D47A1',
    paddingVertical: 10,
  },
  navItem: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BottomNavBar;
