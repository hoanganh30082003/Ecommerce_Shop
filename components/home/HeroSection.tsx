import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StyledText } from '../StyledText';

export const HeroSection = () => (
    <View style={styles.heroContainer}>
        <Image 
            source={{ uri: 'https://picsum.photos/200/300' }}
            style={[styles.sideImage, styles.sideImageLeft]} 
        />
        <View style={styles.hero}>
            <StyledText style={styles.siteName}>reallygreatsite.com</StyledText>
            <Text style={styles.heroText}>Kids Fashion</Text>
            <StyledText style={styles.heroSubText}>EXTRA 50% OFF</StyledText>
            <TouchableOpacity style={styles.shopNowButton}>
                <StyledText style={styles.shopNowButtonText}>SHOP NOW</StyledText>
            </TouchableOpacity>
        </View>
        <Image 
            source={{ uri: 'https://picsum.photos/200/300?random=1' }}
            style={[styles.sideImage, styles.sideImageRight]} 
        />
  </View>
);

const styles = StyleSheet.create({
    heroContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5EFEA',
        paddingVertical: 30,
    },
    sideImage: {
        width: 150,
        height: 220,
        borderRadius: 8,
        borderWidth: 5,
        borderColor: 'white',
        transform: [{ rotate: '-5deg' }]
    },
    sideImageLeft: {
        marginRight: -20,
        zIndex: 0,
    },
    sideImageRight: {
        marginLeft: -20,
        transform: [{ rotate: '5deg' }],
        zIndex: 0,
    },
    hero: {
        backgroundColor: '#F5EFEA',
        padding: 20,
        alignItems: 'center',
        margin: 20,
        borderRadius: 10,
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#E1D9D1',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      },
    siteName: {
        fontSize: 12,
        color: '#A09998',
        marginBottom: 20,
    },
      heroText: {
          fontSize: 48,
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'serif', // Keep this more decorative font for the main heading
      },
      heroSubText: {
          fontSize: 24,
          color: '#555',
          marginTop: 10,
          letterSpacing: 2,
      },
      shopNowButton: {
          marginTop: 20,
          backgroundColor: 'transparent',
          paddingVertical: 12,
          paddingHorizontal: 30,
      },
      shopNowButtonText: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333',
          letterSpacing: 3,
      },
}); 