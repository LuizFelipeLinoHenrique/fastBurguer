import { NavigationContainer } from "@react-navigation/native";

import { CartProvider } from "./src/context/CartoonContext";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
    return (
        <CartProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </CartProvider>
    );
}