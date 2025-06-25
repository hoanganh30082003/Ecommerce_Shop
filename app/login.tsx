import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginForm from '../components/auth/LoginForm';
export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <LoginForm />
  </SafeAreaView>
  );
} 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5EFEA',
    },
    contentContainer: {
      paddingHorizontal: 24,
    }
  }); 