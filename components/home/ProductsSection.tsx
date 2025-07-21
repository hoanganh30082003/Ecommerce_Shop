import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StyledText } from '../StyledText';

interface Product {
    _id: string;
    name: string;
    images?: string[];
    description?: string;
    price?: number;
    fixed_combo_price?: number;
    type?: string;
    // ... các trường khác nếu cần
}

interface EmptyProduct {
    _id: string;
    empty: true;
}

type ProductListItem = Product | EmptyProduct;

const formatData = (data: Product[], numColumns: number): ProductListItem[] => {
    const dataCopy: ProductListItem[] = [...data];
    const numberOfFullRows = Math.floor(dataCopy.length / numColumns);
    let numberOfElementsLastRow = dataCopy.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      dataCopy.push({ _id: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return dataCopy;
};

const DEFAULT_IMAGE = 'https://th.bing.com/th/id/OIP.N6K53QELIRhSFZxxhaz2SwHaHa?w=199&h=199&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3';

const ProductCard = ({ item }: { item: ProductListItem }) => {
    if ('empty' in item && item.empty) {
        return <View style={[styles.productCard, styles.itemInvisible]} />;
    }
    const product = item as Product;
    const [imgSrc, setImgSrc] = React.useState(product.images?.[0] || DEFAULT_IMAGE);
    const handleAddToCart = async () => {
      const user_id = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
      if (!user_id) {
        Alert.alert('Bạn cần đăng nhập để thêm vào giỏ hàng!');
        return;
      }
      try {
        await axios.post('http://localhost:9999/cart/add', {
          user_id,
          product_id: product._id,
          variant: {}, // Nếu có variant thì truyền vào, ở đây để rỗng
          quantity: 1
        });
        Alert.alert('Đã thêm vào giỏ hàng!');
      } catch (err: any) {
        Alert.alert('Lỗi khi thêm vào giỏ hàng', err?.response?.data?.error || 'Lỗi không xác định');
      }
    };
    return (
        <View style={styles.productCard}>
            <Image
                source={{ uri: imgSrc }}
                style={styles.productImage}
                onError={() => setImgSrc(DEFAULT_IMAGE)}
            />
            <View style={styles.productInfo}>
                <StyledText style={styles.productName}>{product.name}</StyledText>
                <StyledText style={styles.productDescription}>{product.description}</StyledText>
                <StyledText style={styles.finalPrice}>{product.price?.toLocaleString() || product.fixed_combo_price?.toLocaleString() || 0} đ</StyledText>
                <TouchableOpacity
                  style={styles.addToCartBtn}
                  onPress={handleAddToCart}
                >
                  <StyledText style={styles.addToCartText}>+ Thêm vào giỏ</StyledText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window');
const cardWidth = (width - (24 * 2) - (20 * 3)) / 4;

export const ProductsSection = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:9999/product')
            .then(res => setProducts(res.data.data))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, []);
    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
    return (
        <View style={styles.productsSection}>
            <FlatList
                data={formatData(products, 4)}
                renderItem={({ item }) => <ProductCard item={item} />}
                keyExtractor={item => (item as any)._id}
                numColumns={4}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.productList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    productsSection: {
        paddingVertical: 20,
    },
    productList: {},
    row: {
        justifyContent: 'space-between',
    },
    productCard: {
        width: cardWidth,
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        borderWidth: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
    },
    productImage: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        resizeMode: 'cover',
    },
    productInfo: {
        padding: 15,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#222',
        textAlign: 'center',
    },
    productDescription: {
        fontSize: 13,
        color: '#888',
        marginBottom: 10,
        textAlign: 'center',
    },
    finalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e53935',
        marginBottom: 8,
    },
    addToCartBtn: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 6,
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
}); 