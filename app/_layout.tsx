import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded] = useFonts({
    'Muli-ExtraLight': require('../assets/fonts/Muli-ExtraLight.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}
