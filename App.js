import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';

import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import NotificationsScreen from './components/NotificationsScreen';
import SettingsScreen from './components/SettingsScreen';

import ImageScreen from './components/ImageScreen';
import CameraScreen from './components/CameraScreen';
import ServiceScreen from './components/ServiceScreen';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configuracion' }} />
      <Stack.Screen name="Image" component={ImageScreen} options={{ title: 'Imagen' }}/>
      <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Capturar Imagen' }} />
      <Stack.Screen name="Service" component={ServiceScreen} options={{ title: 'Digitalizar' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  // hay que buscar un mejor lugar para pedir los permisos
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
    })();
  }, []);

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

