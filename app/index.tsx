import { Header } from '@/components/home/Header';
import { HeroSection } from '@/components/home/HeroSection';
import { ProductsSection } from '@/components/home/ProductsSection';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartProvider } from '../components/CartContext';

export default function HomeScreen() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Đảm bảo layout đã mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Chỉ redirect khi đã mount
  useEffect(() => {
    if (mounted && typeof window !== 'undefined' && !localStorage.getItem('token')) {
      router.replace('/login');
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <CartProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView>
          <View style={styles.contentContainer}>
            <HeroSection />
            <ProductsSection />
          </View>
        </ScrollView>
      </SafeAreaView>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 24,
  }
}); 