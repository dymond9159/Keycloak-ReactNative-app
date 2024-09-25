import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import {
  ReactNativeKeycloakProvider,
  useKeycloak,
} from '@react-keycloak/native';
import moduleKeycloak from '@/modules/keycloak';

import { useColorScheme } from '@/hooks/useColorScheme';
import Login from '@/components/Login';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { keycloak } = useKeycloak();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  //<Text>{`Welcome ${keycloak?.authenticated} - ${keycloak?.token}!`}</Text>

  return (
    <ReactNativeKeycloakProvider
      authClient={moduleKeycloak}
      initOptions={{
        redirectUri: 'myapp://Homepage',
        inAppBrowserOptions: {
          // For iOS check: https://github.com/proyecto26/react-native-inappbrowser#ios-options
          dismissButtonStyle: 'close', // Can be 'done' or 'cancel'
          preferredBarTintColor: '#000000', // Color for navigation bar
          preferredControlTintColor: '#ffffff', // Color for the controls
          readerMode: false, // Enable reader mode if available
          animated: true, // Animate transitions
          modalPresentationStyle: 'fullScreen', // Presentation style
          modalTransitionStyle: 'coverVertical', // Transition style for modal
          modalEnabled: true, // Enable modal mode
          enableBarCollapsing: false, // Collapse bar when scrolling down
          ephemeralWebSession: false, // Clear session after login (iOS 13+)
          // For Android check: https://github.com/proyecto26/react-native-inappbrowser#android-options
          showTitle: true, // Show title in custom tabs
          toolbarColor: '#6200EE', // Toolbar color
          secondaryToolbarColor: '#03DAC5', // Secondary toolbar color
          enableUrlBarHiding: true, // Hide the URL bar when scrolling
          enableDefaultShare: true, // Show share button in menu
          forceCloseOnRedirection: false, // Close the tab after redirect
          showInRecents: true, // Show custom tab in recent apps
          animations: {
            startEnter: 'slide_in_right', // Animation for opening
            startExit: 'slide_out_left', // Animation for closing
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'value',
          },
        },
      }}
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {!keycloak?.authenticated ? (
          <Login />
        ) : (
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='not-found' />
          </Stack>
        )}
      </ThemeProvider>
    </ReactNativeKeycloakProvider>
  );
}
