import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import { MainTabsParamList } from "../navigation/MainTabs";
import { RootStackParamList } from "../navigation/RootNavigator";
import { colors, fontSize, radius, spacing } from "../theme";

type ProfileScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabsParamList, "Profile">,
    NativeStackScreenProps<RootStackParamList>
>;

const SESSION_KEY = "@fastburguer_session";

type Session = {
    email: string;
};

export function ProfileScreen({ navigation }: ProfileScreenProps) {
    const [email, setEmail] = useState("cliente@email.com");

    useEffect(() => {
        async function loadSession() {
            try {
                const storedSession = await AsyncStorage.getItem(SESSION_KEY);

                if (!storedSession) {
                    return;
                }

                const session = JSON.parse(storedSession) as Session;
                if (session.email) {
                    setEmail(session.email);
                }
            } catch {
                // If parse fails, keep default
            }
        }

        loadSession();
    }, []);

    async function handleLogout() {
        Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sair",
                style: "destructive",
                onPress: async () => {
                    await AsyncStorage.removeItem(SESSION_KEY);
                    const rootNav =
                        navigation.getParent<
                            NativeStackNavigationProp<RootStackParamList>
                        >();

                    if (rootNav) {
                        rootNav.reset({
                            index: 0,
                            routes: [{ name: "Auth" }],
                        });
                    } else {
                        navigation.navigate("Auth");
                    }
                },
            },
        ]);
    }

    function showComingSoon(feature: string) {
        Alert.alert(
            feature,
            "Esta funcionalidade estará disponível na próxima atualização.",
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.title}>Perfil</Text>

                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Ionicons
                            name="person"
                            size={38}
                            color={colors.white}
                        />
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>Cliente Fast</Text>
                        <Text style={styles.email}>{email}</Text>
                    </View>
                </View>

                <View style={styles.menu}>
                    <MenuItem
                        icon="receipt-outline"
                        title="Meus pedidos"
                        onPress={() => showComingSoon("Meus pedidos")}
                    />

                    <MenuItem
                        icon="location-outline"
                        title="Endereços"
                        onPress={() => showComingSoon("Endereços")}
                    />

                    <MenuItem
                        icon="card-outline"
                        title="Formas de pagamento"
                        onPress={() => showComingSoon("Formas de pagamento")}
                    />

                    <MenuItem
                        icon="settings-outline"
                        title="Configurações"
                        onPress={() => showComingSoon("Configurações")}
                    />

                    <MenuItem
                        icon="log-out-outline"
                        title="Sair"
                        danger
                        onPress={handleLogout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

type MenuItemProps = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    onPress: () => void;
    danger?: boolean;
};

function MenuItem({
    icon,
    title,
    onPress,
    danger = false,
}: MenuItemProps) {
    return (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Ionicons
                name={icon}
                size={23}
                color={danger ? colors.danger : colors.grayDark}
            />

            <Text
                style={[
                    styles.menuText,
                    danger && styles.menuTextDanger,
                ]}
            >
                {title}
            </Text>

            <Ionicons
                name="chevron-forward"
                size={19}
                color={colors.gray}
                style={styles.chevron}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream,
    },

    scrollContent: {
        padding: spacing.lg,
        paddingTop: spacing.sm,
        paddingBottom: spacing.xxl,
    },

    title: {
        fontSize: fontSize.title,
        color: colors.black,
        fontWeight: "900",
    },

    profileCard: {
        backgroundColor: colors.white,
        borderRadius: radius.xl,
        padding: spacing.lg,
        marginTop: spacing.lg,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },

    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    profileInfo: {
        marginLeft: spacing.md,
        flex: 1,
    },

    name: {
        color: colors.black,
        fontSize: 20,
        fontWeight: "900",
    },

    email: {
        color: colors.grayDark,
        marginTop: 4,
        fontSize: 14,
    },

    menu: {
        backgroundColor: colors.white,
        borderRadius: radius.xl,
        marginTop: spacing.lg,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },

    menuItem: {
        minHeight: 62,
        paddingHorizontal: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.grayLight,
    },

    menuText: {
        color: colors.black,
        fontSize: 15,
        fontWeight: "600",
        marginLeft: spacing.md,
    },

    menuTextDanger: {
        color: colors.danger,
    },

    chevron: {
        marginLeft: "auto",
    },
});