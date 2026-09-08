import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { CartItem, Product } from "../types";

type CartContextData = {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
    shipping: number;
    total: number;
};

const CartContext = createContext<CartContextData | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode;
};

const CART_STORAGE_KEY = "@fastburguer_cart";

export function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function loadCart() {
            try {
                const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);

                if (storedCart) {
                    const parsedCart = JSON.parse(storedCart) as CartItem[];
                    setItems(parsedCart);
                }
            } finally {
                setLoaded(true);
            }
        }

        loadCart();
    }, []);

    useEffect(() => {
        if (!loaded) {
            return;
        }

        AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items, loaded]);

    function addToCart(product: Product) {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id,
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item,
                );
            }

            return [
                ...currentItems,
                {
                    product,
                    quantity: 1,
                },
            ];
        });
    }

    function removeFromCart(productId: string) {
        setItems((currentItems) =>
            currentItems.filter((item) => item.product.id !== productId),
        );
    }

    function increaseQuantity(productId: string) {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item,
            ),
        );
    }

    function decreaseQuantity(productId: string) {
        setItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.product.id === productId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item,
                )
                .filter((item) => item.quantity > 0),
        );
    }

    function clearCart() {
        setItems([]);
    }

    const totalItems = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items],
    );

    const subtotal = useMemo(
        () =>
            items.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0,
            ),
        [items],
    );

    const shipping = subtotal > 0 ? 5 : 0;

    const total = subtotal + shipping;

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                totalItems,
                subtotal,
                shipping,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextData {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart deve ser utilizado dentro de CartProvider.");
    }

    return context;
}