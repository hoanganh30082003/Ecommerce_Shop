import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CartProvider, useCart } from '../components/CartContext';

const CheckoutContent = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!name || !phone || !address) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin giao hàng!');
      return;
    }
    setLoading(true);
    try {
      // Gửi request tạo payment url tới backend
      const res = await axios.post('http://localhost:9999/payment/create_payment_url', {
        _id: Date.now().toString(), // Tạm thời dùng timestamp làm mã đơn hàng
        amount: total,
        bankCode: '',
        language: 'vn',
        name,
        phone,
        address,
        cart
      });
      if (res.data.redirectUrl) {
        clearCart();
        window.location.href = res.data.redirectUrl;
      } else {
        Alert.alert('Không tạo được link thanh toán!');
      }
    } catch (err) {
      Alert.alert('Lỗi khi thanh toán!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thanh toán</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>
        <TextInput style={styles.input} placeholder="Họ tên" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Địa chỉ" value={address} onChangeText={setAddress} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Đơn hàng</Text>
        {cart.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <Text>{item.name} x{item.quantity}</Text>
            <Text>{(item.price * item.quantity).toLocaleString()} đ</Text>
          </View>
        ))}
        <Text style={styles.total}>Tổng: {total.toLocaleString()} đ</Text>
      </View>
      <TouchableOpacity style={styles.payBtn} onPress={handleCheckout} disabled={loading || cart.length === 0}>
        <Text style={styles.payText}>{loading ? 'Đang xử lý...' : 'Thanh toán VNPay'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default function CheckoutPage() {
  return (
    <CartProvider>
      <CheckoutContent />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flexGrow: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 12 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'right' },
  payBtn: { backgroundColor: '#00b14f', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  payText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 