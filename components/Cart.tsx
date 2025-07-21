import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from './CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Giỏ hàng trống</Text>
      ) : (
        cart.map(item => (
          <View key={item.id} style={styles.item}>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
              <View style={styles.quantityRow}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} style={styles.qtyBtn}><Text>-</Text></TouchableOpacity>
                <Text style={styles.qty}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.qtyBtn}><Text>+</Text></TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
              <Text style={{ color: 'red' }}>Xóa</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      <View style={styles.footer}>
        <Text style={styles.total}>Tổng: {total.toLocaleString()} đ</Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout' as any)} disabled={cart.length === 0}>
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearBtn} onPress={clearCart} disabled={cart.length === 0}>
          <Text style={styles.clearText}>Xóa hết</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flexGrow: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: '#fff', borderRadius: 8, padding: 10, elevation: 2 },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '500' },
  price: { color: '#888', marginVertical: 4 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  qtyBtn: { padding: 6, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginHorizontal: 6 },
  qty: { minWidth: 24, textAlign: 'center' },
  removeBtn: { marginLeft: 8 },
  footer: { marginTop: 24, alignItems: 'center' },
  total: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  checkoutBtn: { backgroundColor: '#007bff', padding: 12, borderRadius: 8, marginBottom: 8, width: 200, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: 'bold' },
  clearBtn: { backgroundColor: '#eee', padding: 10, borderRadius: 8, width: 200, alignItems: 'center' },
  clearText: { color: '#888' },
});

export default Cart; 