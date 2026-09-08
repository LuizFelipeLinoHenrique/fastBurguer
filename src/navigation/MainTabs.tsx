import { Ionicons } from "@expo/vector-icons";
import {
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/HomeScreen";
import { ProductsScreen } from "../screens/ProductsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { colors } from "../theme";

export type MainTabsParamList = {
    Home: undefined;
    Products: undefined;
    Profile: undefined;
};

const Tab =
    createBottomTabNavigator<MainTabsParamList>();

export function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.gray,

                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },

                tabBarStyle: {
                    height: 65,
                    paddingBottom: 8,
                    paddingTop: 6,
                    backgroundColor: colors.white,
                },

                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    switch (route.name) {
                        case "Home":
                            iconName = "home-outline";
                            break;

                        case "Products":
                            iconName = "restaurant-outline";
                            break;

                        case "Profile":
                            iconName = "person-outline";
                            break;
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "Início",
                }}
            />

            <Tab.Screen
                name="Products"
                component={ProductsScreen}
                options={{
                    title: "Cardápio",
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: "Perfil",
                }}
            />
        </Tab.Navigator>
    );
}