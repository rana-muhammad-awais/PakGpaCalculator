import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initDb } from '../database/db';
import { View, Text, ActivityIndicator } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CourseEntryScreen from '../screens/CourseEntryScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    // Initialize Database
    try {
      initDb();
      setDbReady(true);
    } catch (e) {
      console.error('Database initialization failed', e);
    }
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Initializing offline database...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a2e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Pak GPA Calculator' }} 
        />
        <Stack.Screen 
          name="CourseEntry" 
          component={CourseEntryScreen} 
          options={{ title: 'Semester Grades' }} 
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Your Results' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
