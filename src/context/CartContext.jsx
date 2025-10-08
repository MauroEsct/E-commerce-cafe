import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (item, quantity) => {
        if (isInCart(item.id)) {
            setCart(cart.map(prod => {
                if (prod.id === item.id) {
                    return { ...prod, quantity: prod.quantity + quantity };
                }
                return prod;
            }));
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    };

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id);
    };

    const removeItem = (id) => {
        setCart(cart.filter(prod => prod.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalItems = () => {
        return cart.reduce((acc, prod) => acc + prod.quantity, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addItem,
            removeItem,
            clearCart,
            getTotalItems,
            getTotalPrice 
        }}>
            {children}
        </CartContext.Provider>
    );
};