import { View } from 'react-native';
import RegisterForm from '../components/auth/RegisterForm';

export default function SignupScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5EFEA'}}>
      <RegisterForm />
    </View>
  );
} 