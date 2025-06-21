import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { StyledText } from '../StyledText';

interface Product {
    id: string;
    name: string;
    image: string;
    category: string;
    description: string;
    price: number;
    originalPrice?: number;
    stockStatus: 'in stock' | 'out of stock';
}

interface EmptyProduct {
    id: string;
    empty: true;
}

type ProductListItem = Product | EmptyProduct;

const mockProducts: Product[] = [
    { id: '1', name: 'BKID Pipe', image: 'https://picsum.photos/seed/pipe/400/400', category: 'Accessories', description: 'Description of this product.', price: 0, stockStatus: 'out of stock' },
    { id: '2', name: 'Bang and Olufsen Speaker', image: 'https://picsum.photos/seed/speaker/400/400', category: 'Electronics', description: 'Description of this product.', price: 74.85, originalPrice: 86.85, stockStatus: 'in stock' },
    { id: '3', name: 'Audio Technica Turn-table', image: 'https://picsum.photos/seed/turntable/400/400', category: 'Electronics', description: 'Description of this product.', price: 0, stockStatus: 'out of stock' },
    { id: '4', name: 'Monocle Sneakers', image: 'https://picsum.photos/seed/sneakers/400/400', category: 'Electronics', description: 'Description of this product.', price: 0, stockStatus: 'out of stock' },
    { id: '5', name: 'Classic Gold Watch', image: 'https://picsum.photos/seed/watch/400/400', category: 'Watches', description: 'Description of this product.', price: 250, stockStatus: 'in stock' },
    { id: '6', name: 'Smart Washer', image: 'https://picsum.photos/seed/washer/400/400', category: 'Appliances', description: 'Description of this product.', price: 899.99, stockStatus: 'in stock' },
];

const formatData = (data: Product[], numColumns: number): ProductListItem[] => {
    const dataCopy: ProductListItem[] = [...data];
    const numberOfFullRows = Math.floor(dataCopy.length / numColumns);
    let numberOfElementsLastRow = dataCopy.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      dataCopy.push({ id: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return dataCopy;
};

const ProductCard = ({ item }: { item: ProductListItem }) => {
    if ('empty' in item && item.empty) {
        return <View style={[styles.productCard, styles.itemInvisible]} />;
    }

    const product = item as Product;

    const renderPrice = () => {
        if (product.stockStatus === 'out of stock') {
            return <View style={styles.outOfStockButton}><StyledText style={styles.outOfStockText}>Out of stock</StyledText></View>
        }
        if (product.originalPrice) {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            return (
                <View style={styles.priceContainer}>
                    <StyledText style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</StyledText>
                    <View style={styles.discountBadge}><StyledText style={styles.discountText}>%{discount}</StyledText></View>
                    <StyledText style={styles.finalPrice}>${product.price.toFixed(2)}</StyledText>
                </View>
            )
        }
        return <StyledText style={styles.finalPrice}>${product.price.toFixed(2)}</StyledText>
    }

    return (
        <View style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <View style={styles.categoryTag}>
                    <StyledText style={styles.categoryText}>{product.category}</StyledText>
                </View>
                <StyledText style={styles.productName}>{product.name}</StyledText>
                <StyledText style={styles.productDescription}>{product.description}</StyledText>
                {renderPrice()}
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window');
// Recalculate for 4 columns: 24 padding on each side, 20 gap between items (3 gaps total)
const cardWidth = (width - (24 * 2) - (20 * 3)) / 4; 

export const ProductsSection = () => (
    <View style={styles.productsSection}>
        <FlatList
            data={formatData(mockProducts, 4)}
            renderItem={({ item }) => <ProductCard item={item} />}
            keyExtractor={item => item.id}
            numColumns={4}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.productList}
         />
    </View>
);

const styles = StyleSheet.create({
    productsSection: {
        paddingVertical: 20,
    },
    productsTitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    productsSubtitle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 20,
    },
    productList: {
        // No specific styles needed here now that we use FlatList's contentContainerStyle
    },
    row: {
        justifyContent: 'space-between',
    },
    productCard: {
        width: cardWidth,
        marginBottom: 20,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
    },
    productImage: {
        width: '100%',
        height: 200,
    },
    productInfo: {
        padding: 15,
        backgroundColor: 'white',
    },
    categoryTag: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 12,
        color: '#555',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#000',
    },
    productDescription: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 15,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: 'gray',
        fontSize: 14,
    },
    discountBadge: {
        backgroundColor: '#ff4d4d',
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginHorizontal: 8,
    },
    discountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    finalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    outOfStockButton: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    outOfStockText: {
        color: '#888',
        fontWeight: 'bold',
    },
}); 