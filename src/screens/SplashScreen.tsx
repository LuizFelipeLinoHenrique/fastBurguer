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

export function SplashScreen({ navigation }: Props) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Auth");
        }, 2500);

        return () => clearTimeout(timer);
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