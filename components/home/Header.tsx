import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { StyledText } from '../StyledText';

const IconButton = ({ children, onPress }: { children: React.ReactNode, onPress?: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Pressable
            onPress={onPress}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
            style={[styles.iconButton, isHovered && styles.iconButtonHovered]}
        >
            {children}
        </Pressable>
    )
}

export const Header = () => {
    return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <StyledText style={styles.logo}>Store</StyledText>
        <View style={styles.nav}>
          <StyledText style={styles.navItemText}>Products</StyledText>
          <Pressable style={styles.navItem}>
            <StyledText style={styles.navItemText}>Categories</StyledText>
            <Feather name="chevron-down" size={16} color="black" />
          </Pressable>
           <Pressable style={styles.navItem}>
            <StyledText style={styles.navItemText}>Brands</StyledText>
            <Feather name="chevron-down" size={16} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.headerRight}>
        <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="gray" style={styles.searchIcon} />
            <TextInput style={styles.search} placeholder="Search..." placeholderTextColor="gray"/>
        </View>
        <IconButton>
          <Feather name="shopping-bag" size={24} color="black" />
        </IconButton>
        <Pressable style={styles.loginButton}>
          <Feather name="arrow-right" size={16} color="white" style={{ marginRight: 5 }}/>
          <StyledText style={styles.loginButtonText}>Login</StyledText>
        </Pressable>
      </View>
    </View>
  );
}

  const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: 'white',
      },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
      logo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 30,
      },
      nav: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
      },
      navItemText: {
        fontSize: 16,
        marginRight: 4,
      },
      headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        marginRight: 20,
      },
      searchIcon: {
        padding: 10,
      },
      search: {
        fontFamily: 'Muli-ExtraLight',
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10,
        minWidth: 300,
        backgroundColor: '#f8f8f8',
        color: '#000',
      },
      iconButton: {
        padding: 8,
        borderRadius: 8,
        margin: 5,
        borderColor: '#e0e0e0',
        borderWidth: 1,
      },
      iconButtonHovered: {
        backgroundColor: '#e0e0e0',
      },
      loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
      loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
  }); 