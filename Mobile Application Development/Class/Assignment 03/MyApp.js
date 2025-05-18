import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen() {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setCity('Permission denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let geo = await Location.reverseGeocodeAsync(location.coords);
      if (geo.length > 0) {
        setCity(geo[0].city || 'Unknown');
      }
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.center}>
      <Text style={styles.label}>Your City:</Text>
      {loading ? <ActivityIndicator size="large" /> : <Text style={styles.city}>{city}</Text>}
    </View>
  );
}

function ProfileScreen({ route, navigation }) {
  const [name, setName] = useState(route.params?.name || '');

  useEffect(() => {
    navigation.setOptions({ title: name || 'Profile' });
  }, [name]);

  return (
    <View style={styles.center}>
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        value={name}
        onChangeText={(text) => {
          setName(text);
          navigation.setOptions({ title: text || 'Profile' });
        }}
        placeholder="Your Name"
        style={styles.input}
      />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.label}>Settings Screen</Text>
    </View>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}

export default function MyApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: 'Profile' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  city: {
    fontSize: 24,
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    fontSize: 18,
  },
});
