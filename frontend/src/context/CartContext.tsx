import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    clearCart: () => void;
    removeOne: (bookId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((c) => c.bookId === item.bookId);
            const updatedCart = prevCart.map((c) => 
            c.bookId === item.bookId
            ? {...c, price: c.price + item.price, quantity: c.quantity + item.quantity}
        : c
    );

    return existingItem ? updatedCart : [...prevCart, item]; 
        });
    };

    const removeFromCart = (bookId: number) => {
        setCart((prevCart) => prevCart.filter((c) => c.bookId !== bookId));
    };

    const removeOne = (bookId: number) => {
        setCart((prevCart) => {
            // Find the existing item with the given bookId
            const existingItem = prevCart.find((c) => c.bookId === bookId);
    
            // If the item exists and the quantity is greater than 1, subtract 1 from its quantity and subtract the price of 1 book
            if (existingItem && existingItem.quantity > 1) {
                const updatedCart = prevCart.map((c) =>
                    c.bookId === bookId
                        ? { ...c, quantity: c.quantity - 1, price: c.price - (existingItem.price / existingItem.quantity) }
                        : c
                );
                return updatedCart;
            }
    
            // If the item doesn't exist or quantity is 1, remove it from the cart
            return prevCart.filter((c) => c.bookId !== bookId);
        });
    };
    
    
    
    const clearCart = () => {
        setCart(() => []);
    };

    return (
        <CartContext.Provider
        value={{cart, addToCart, removeFromCart, clearCart, removeOne }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};