// src/pages/BluetoothScreen.js

import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import {PermissionsAndroid, Platform} from 'react-native';

const manager = new BleManager();

const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
  }
};

const BluetoothScreen = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  useEffect(() => {
    requestPermissions();
    return () => {
      manager.destroy();
    };
  }, []);

  const scanDevices = () => {
    setDevices([]);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }

      if (device && device.name) {
        setDevices(prevDevices => [...prevDevices, device]);
      }
    });

    setTimeout(() => {
      manager.stopDeviceScan();
    }, 5000); // Stop scanning after 5 seconds
  };

  const connectToDevice = async device => {
    try {
      await manager.stopDeviceScan();
      const connectedDevice = await device.connect();
      setConnectedDevice(connectedDevice);
      console.log('Connected to', connectedDevice.name);
    } catch (error) {
      console.error('Connection failed', error);
    }
  };

  return (
    <View>
      <Button title="Scan for Devices" onPress={scanDevices} />
      {connectedDevice ? (
        <Text>Connected to {connectedDevice.name}</Text>
      ) : (
        <FlatList
          data={devices}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
              <Button title="Connect" onPress={() => connectToDevice(item)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default BluetoothScreen;
