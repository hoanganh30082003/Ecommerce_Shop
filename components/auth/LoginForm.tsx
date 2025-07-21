import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Vui lòng nhập email và mật khẩu!');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:9999/user/login', { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        if (res.data.user && res.data.user._id) {
          localStorage.setItem('user_id', res.data.user._id);
        }
        Alert.alert('Đăng nhập thành công!');
        router.push('/');
      } else {
        Alert.alert('Đăng nhập thất bại!');
      }
    } catch (err: any) {
      Alert.alert('Đăng nhập thất bại', err?.response?.data?.error || 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>* Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>* Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Đang đăng nhập...' : 'Sign In'}</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={{ color: '#888' }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.loginLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    alignSelf: 'center',
  },
  formGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
  },
  loginLink: {
    color: '#007bff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  modal: {
    width: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    paddingVertical: 24,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default LoginForm; 