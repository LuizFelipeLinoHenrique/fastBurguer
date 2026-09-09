import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/RootNavigator";
import { colors, fontSize } from "../theme";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "Splash"
>;

const SESSION_KEY = "@fastburguer_session";

export function SplashScreen({ navigation }: Props) {
    useEffect(() => {
        let isMounted = true;

        async function checkAuth() {
            try {
                const session = await AsyncStorage.getItem(SESSION_KEY);
                await new Promise((resolve) => setTimeout(resolve, 1800));

                if (!isMounted) {
                    return;
                }

                if (session) {
                    navigation.replace("MainTabs");
                } else {
                    navigation.replace("Auth");
                }
            } catch {
                if (isMounted) {
                    navigation.replace("Auth");
                }
            }
        }

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.logoText}>🍔</Text>
            </View>

            <Text style={styles.title}>Fast Burguer</Text>

            <Text style={styles.slogan}>
                Seu hambúrguer favorito,{"\n"}mais rápido que nunca!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },

    logo: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: colors.cream,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },

    logoText: {
        fontSize: 58,
    },

    title: {
        color: colors.white,
        fontSize: fontSize.title,
        fontWeight: "900",
    },

    slogan: {
        color: colors.white,
        textAlign: "center",
        marginTop: 10,
        fontSize: 16,
        lineHeight: 23,
    },
});