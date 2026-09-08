import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    CompositeScreenProps,
} from "@react-navigation/native";

import {
    BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import {
    MainTabsParamList,
} from "../navigation/MainTabs";

import {
    RootStackParamList,
} from "../navigation/RootNavigator";

import {
    colors,
    fontSize,
    radius,
    spacing,
} from "../theme";

type ProfileScreenProps =
    CompositeScreenProps<
        BottomTabScreenProps<
            MainTabsParamList,
            "Profile"
        >,
        NativeStackScreenProps<RootStackParamList>
    >;

const SESSION_KEY =
    "@fastburguer_session";

type Session = {
    email: string;
};

export function ProfileScreen({
    navigation,
}: ProfileScreenProps) {
    const [email, setEmail] = useState(
        "cliente@email.com",
    );

    useEffect(() => {
        async function loadSession() {
            const storedSession =
                await AsyncStorage.getItem(
                    SESSION_KEY,
                );

            if (!storedSession) {
                return;
            }

            const session =
                JSON.parse(
                    storedSession,
                ) as Session;

            setEmail(session.email);
        }

        loadSession();
    }, []);

    async function handleLogout() {
        await AsyncStorage.removeItem(
            SESSION_KEY,
        );

        navigation.replace("Auth");
    }

    function showComingSoon() {
        Alert.alert(
            "Em breve",
            "Esta funcionalidade será implementada posteriormente.",
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Perfil
            </Text>

            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <Ionicons
                        name="person"
                        size={38}
                        color={colors.white}
                    />
                </View>

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>
                        Cliente Fast
                    </Text>

                    <Text style={styles.email}>
                        {email}
                    </Text>
                </View>
            </View>

            <View style={styles.menu}>
                <MenuItem
                    icon="receipt-outline"
                    title="Meus pedidos"
                    onPress={showComingSoon}
                />

                <MenuItem
                    icon="location-outline"
                    title="Endereços"
                    onPress={showComingSoon}
                />

                <MenuItem
                    icon="card-outline"
                    title="Formas de pagamento"
                    onPress={showComingSoon}
                />

                <MenuItem
                    icon="settings-outline"
                    title="Configurações"
                    onPress={showComingSoon}
                />

                <MenuItem
                    icon="log-out-outline"
                    title="Sair"
                    danger
                    onPress={handleLogout}
                />
            </View>
        </View>
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
                color={
                    danger
                        ? colors.danger
                        : colors.grayDark
                }
            />

            <Text
                style={[
                    styles.menuText,
                    danger &&
                    styles.menuTextDanger,
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
        padding: spacing.lg,
        paddingTop: spacing.xl,
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
    },

    name: {
        color: colors.black,
        fontSize: 20,
        fontWeight: "900",
    },

    email: {
        color: colors.grayDark,
        marginTop: 4,
    },

    menu: {
        backgroundColor: colors.white,
        borderRadius: radius.xl,
        marginTop: spacing.lg,
        overflow: "hidden",
    },

    menuItem: {
        minHeight: 62,
        paddingHorizontal: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor:
            colors.grayLight,
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