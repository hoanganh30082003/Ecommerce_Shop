import axios from 'axios';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = async (item: CartItem) => {
    setCart(prev => {
      const found = prev.find(i => i.id === item.id);
      if (found) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    // Gọi API backend nếu đã đăng nhập
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const user_id = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    if (token && user_id) {
      try {
        await axios.post('http://localhost:9999/cart/add', {
          user_id,
          product_id: item.id,
          variant: {}, // Nếu có variant thì truyền vào, ở đây để rỗng
          quantity: item.quantity
        });
      } catch (err) {
        // Có thể show toast lỗi nếu cần
      }
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}; 