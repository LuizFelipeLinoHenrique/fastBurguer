import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CartProvider } from "./src/context/CartContext";
import { OrdersProvider } from "./src/context/OrdersContext";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
    return (
        <SafeAreaProvider>
            <OrdersProvider>
                <CartProvider>
                    <NavigationContainer>
                        <StatusBar style="dark" />
                        <RootNavigator />
                    </NavigationContainer>
                </CartProvider>
            </OrdersProvider>
        </SafeAreaProvider>
    );
}