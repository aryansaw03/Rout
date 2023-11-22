import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider } from '../context/auth';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/loading',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
		"JosefinSans-Regular": require("../assets/fonts/JosefinSans-Regular.ttf"),
		"JosefinSans-Light": require("../assets/fonts/JosefinSans-Light.ttf"),
		"JosefinSans-Medium": require("../assets/fonts/JosefinSans-Medium.ttf"),
		"JosefinSans-Bold": require("../assets/fonts/JosefinSans-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
			<AuthProvider>
				<Slot />
			</AuthProvider>
  );
}
