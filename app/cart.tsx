import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartItem, CartProvider } from '../components/CartContext';

const DEFAULT_IMAGE = 'https://th.bing.com/th/id/OIP.N6K53QELIRhSFZxxhaz2SwHaHa?w=199&h=199&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3';

const CartContent = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  // Hiển thị thông báo sau khi thanh toán VNPay redirect về
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const alertMsg = params.get('alert');
      if (alertMsg) {
        Alert.alert(alertMsg);
        // Xóa query string khỏi URL sau khi hiển thị
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {
    const user_id = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    if (!user_id) {
      setLoading(false);
      return;
    }
    axios.get(`http://localhost:9999/cart/${user_id}`)
      .then(res => {
        const items = res.data.data?.items?.map((item: any) => ({
          id: item.product_id?._id || '',
          name: item.product_id?.name || '',
          price: item.product_id?.price || 0,
          quantity: item.quantity,
          image: item.product_id?.images?.[0] || '',
        })) || [];
        setCartItems(items);
      })
      .catch(() => setCartItems([]))
      .finally(() => setLoading(false));
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  const handleCheckout = async () => {
    const user_id = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    if (!user_id) {
      Alert.alert('Bạn cần đăng nhập để thanh toán!');
      return;
    }
    if (cartItems.length === 0) {
      Alert.alert('Giỏ hàng trống!');
      return;
    }
    try {
      const res = await axios.post('http://localhost:9999/payment/create_payment_url', {
        _id: Date.now().toString(), // mã đơn hàng tạm thời
        amount: total,
        bankCode: '',
        language: 'vn',
        user_id,
        cart: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      });
      if (res.data.redirectUrl) {
        window.location.href = res.data.redirectUrl;
      } else {
        Alert.alert('Không tạo được link thanh toán!');
      }
    } catch (err) {
      Alert.alert('Lỗi khi thanh toán!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/') }>
        <Text style={styles.backText}>{'< Quay về trang chủ'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Giỏ hàng</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Giỏ hàng trống</Text>
      ) : (
        cartItems.map(item => (
          <View key={item.id} style={styles.item}>
            <Image source={{uri: DEFAULT_IMAGE}} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
              <Text style={styles.qty}>Số lượng: {item.quantity}</Text>
            </View>
          </View>
        ))
      )}
      <View style={styles.footer}>
        <Text style={styles.total}>Tổng: {total.toLocaleString()} đ</Text>
        <TouchableOpacity style={styles.payBtn} onPress={handleCheckout} disabled={cartItems.length === 0}>
          <Text style={styles.payText}>Thanh toán VNPay</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default function CartPage() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flexGrow: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: '#fff', borderRadius: 8, padding: 10, elevation: 2 },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '500' },
  price: { color: '#888', marginVertical: 4 },
  qty: { minWidth: 24, textAlign: 'left' },
  footer: { marginTop: 24, alignItems: 'center' },
  total: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  backBtn: {
    marginBottom: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  backText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  payBtn: {
    backgroundColor: '#00b14f',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  payText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 