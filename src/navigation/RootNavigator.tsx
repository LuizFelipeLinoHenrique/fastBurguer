import { NavigatorScreenParams } from "@react-navigation/native";
import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { CartScreen } from "../screens/CartScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { OrderStatusScreen } from "../screens/OrderStatusScreen";
import { ProductDetailScreen } from "../screens/ProductDetailScreen";
import { SplashScreen } from "../screens/SplashScreen";
import { AuthNavigator } from "./AuthNavigator";
import {
    MainTabs,
    MainTabsParamList,
} from "./MainTabs";

export type RootStackParamList = {
    Splash: undefined;

    Auth: undefined;

    MainTabs: NavigatorScreenParams<MainTabsParamList> | undefined;

    ProductDetail: {
        productId: string;
    };

    Cart: undefined;

    Checkout: undefined;

    OrderStatus: {
        orderNumber: string;
        total: number;
    };
};

const Stack =
    createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
            />

            <Stack.Screen
                name="Auth"
                component={AuthNavigator}
            />

            <Stack.Screen
                name="MainTabs"
                component={MainTabs}
            />

            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
            />

            <Stack.Screen
                name="Cart"
                component={CartScreen}
            />

            <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
            />

            <Stack.Screen
                name="OrderStatus"
                component={OrderStatusScreen}
            />
        </Stack.Navigator>
    );
}