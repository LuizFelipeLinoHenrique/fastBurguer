import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { Order, OrderStatus } from "../types";

export const ORDER_PREPARATION_TIME_MS = 2 * 60 * 1000; // 2 minutes (120,000 ms)

type CreateOrderData = Omit<Order, "id" | "status">;

type OrdersContextData = {
    orders: Order[];
    addOrder: (data: CreateOrderData) => Order;
    getOrderById: (orderId: string) => Order | undefined;
    getEffectiveStatus: (order: Order) => OrderStatus;
    getTimeRemainingSeconds: (order: Order) => number;
};

const OrdersContext = createContext<OrdersContextData | undefined>(undefined);

type OrdersProviderProps = {
    children: ReactNode;
};

const ORDERS_STORAGE_KEY = "@fastburguer_orders";

export function OrdersProvider({ children }: OrdersProviderProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function loadOrders() {
            try {
                const storedOrders =
                    await AsyncStorage.getItem(ORDERS_STORAGE_KEY);

                if (storedOrders) {
                    const parsedOrders = JSON.parse(storedOrders) as Order[];
                    setOrders(parsedOrders);
                }
            } catch {
                setOrders([]);
            } finally {
                setLoaded(true);
            }
        }

        loadOrders();
    }, []);

    useEffect(() => {
        if (!loaded) {
            return;
        }

        AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders)).catch(
            () => {},
        );
    }, [orders, loaded]);

    function getEffectiveStatus(order: Order): OrderStatus {
        const elapsed = Date.now() - order.createdAt;
        if (elapsed < ORDER_PREPARATION_TIME_MS) {
            return "Em preparo";
        }
        return "Entregue";
    }

    function getTimeRemainingSeconds(order: Order): number {
        const elapsed = Date.now() - order.createdAt;
        const remainingMs = ORDER_PREPARATION_TIME_MS - elapsed;
        return Math.max(0, Math.ceil(remainingMs / 1000));
    }

    function addOrder(data: CreateOrderData): Order {
        const newOrder: Order = {
            ...data,
            id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            status: "Em preparo",
        };

        setOrders((prevOrders) => [newOrder, ...prevOrders]);
        return newOrder;
    }

    function getOrderById(orderId: string): Order | undefined {
        return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    }

    return (
        <OrdersContext.Provider
            value={{
                orders,
                addOrder,
                getOrderById,
                getEffectiveStatus,
                getTimeRemainingSeconds,
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
}

export function useOrders(): OrdersContextData {
    const context = useContext(OrdersContext);

    if (!context) {
        throw new Error("useOrders deve ser utilizado dentro de OrdersProvider.");
    }

    return context;
}
