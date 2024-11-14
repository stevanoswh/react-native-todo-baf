// WelcomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.replace('MainTabs'); // Replaces the stack so they don't go back to Welcome
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the App!</Text>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
}
