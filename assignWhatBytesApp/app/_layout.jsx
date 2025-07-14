import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useFonts } from 'expo-font';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Image, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/Theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [showSlider, setShowSlider] = useState(true);

  const slides = [
    {
      id: 1,
      title: 'Get things done.',
      description: 'Just a click away from planning your tasks.',
      image: require('../assets/images/onboardScreen4.jpg'),
    },
    {
      id: 2,
      title: 'Shows alert.',
      description: 'Reminds you when date is near.',
      image: require('../assets/images/onboardScreen5.jpg'),
    },
    {
      id: 3,
      title: 'Start with the app.',
      description: 'Lets Start',
      image: require('../assets/images/onboardScreen3.png'),
    },
  ];

  if (!fontsLoaded) return null; // wait till fonts are loaded

  if (showSlider) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppIntroSlider
          data={slides}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{
              flex: 1,
              alignItems: 'center',
              padding: 15,
              paddingTop: 150,
            }}>
              <Image
                source={item.image}
                style={{
                  width: SIZES.width - 80,
                  height: 400,
                }}
                resizeMode="contain"
              />
              <Text style={{
                fontWeight: 'bold',
                color: COLORS.title,
                fontSize: SIZES.h1,
              }}>
                {item.title}
              </Text>
              <Text style={{
                textAlign: 'center',
                paddingTop: 5,
                color: COLORS.title
              }}>
                {item.description}
              </Text>
            </View>
          )}
          activeDotStyle={{ backgroundColor: COLORS.primary, width: 30 }}
          showSkipButton
          renderNextButton={() => renderButton('Next')}
          renderSkipButton={() => renderButton('Skip')}
          renderDoneButton={() => renderButton('Done')}
          onDone={() => setShowSlider(false)}
        />
        <Text></Text>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

function renderButton(label) {
  return (
    <View style={styles.btn}>
      <Text style={styles.btnText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    paddingTop: 100,
    backgroundColor: COLORS.white,
  },
  image: {
    width: SIZES.width - 80,
    height: 400,
  },
  btn: {
    padding: 12,
  },
  btnText: {
    color: COLORS.title,
    fontWeight: '600',
    fontSize: SIZES.h4,
  },
});
