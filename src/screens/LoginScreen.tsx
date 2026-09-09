import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { CompositeScreenProps } from "@react-navigation/native";
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { AuthStackParamList } from "../navigation/AuthNavigator";
import { RootStackParamList } from "../navigation/RootNavigator";
import {
    colors,
    fontSize,
    radius,
    spacing,
} from "../theme";

type Props = CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, "Login">,
    NativeStackScreenProps<RootStackParamList>
>;

const SESSION_KEY = "@fastburguer_session";

export function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function handleLogin() {
        const normalizedEmail = email.trim();

        if (!normalizedEmail) {
            Alert.alert("Atenção", "Digite seu e-mail.");
            return;
        }

        if (!normalizedEmail.includes("@")) {
            Alert.alert("Atenção", "Digite um e-mail válido.");
            return;
        }

        if (!password.trim()) {
            Alert.alert("Atenção", "Digite sua senha.");
            return;
        }

        if (password.length < 6) {
            Alert.alert(
                "Atenção",
                "A senha deve possuir pelo menos 6 caracteres.",
            );
            return;
        }

        setLoading(true);

        setTimeout(async () => {
            await AsyncStorage.setItem(
                SESSION_KEY,
                JSON.stringify({
                    email: normalizedEmail,
                }),
            );

            setLoading(false);

            const rootNav =
                navigation.getParent<
                    NativeStackNavigationProp<RootStackParamList>
                >();

            if (rootNav) {
                rootNav.reset({
                    index: 0,
                    routes: [{ name: "MainTabs" }],
                });
            } else {
                navigation.navigate("MainTabs");
            }
        }, 700);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >
            <View style={styles.content}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>🍔</Text>
                </View>

                <Text style={styles.title}>
                    Bem-vindo!
                </Text>

                <Text style={styles.subtitle}>
                    Entre na sua conta para fazer seu pedido.
                </Text>

                <View style={styles.form}>
                    <Text style={styles.label}>E-mail</Text>

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor={colors.gray}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Senha</Text>

                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Digite sua senha"
                        placeholderTextColor={colors.gray}
                        secureTextEntry
                        style={styles.input}
                    />

                    <TouchableOpacity
                        style={[
                            styles.button,
                            loading && styles.buttonDisabled,
                        ]}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Entrando..." : "Entrar"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream,
    },

    content: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: spacing.lg,
    },

    logo: {
        alignSelf: "center",
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
    },

    logoText: {
        fontSize: 48,
    },

    title: {
        color: colors.black,
        fontSize: fontSize.title,
        fontWeight: "900",
        textAlign: "center",
    },

    subtitle: {
        color: colors.grayDark,
        fontSize: fontSize.md,
        textAlign: "center",
        marginTop: spacing.sm,
        marginBottom: spacing.xl,
    },

    form: {
        width: "100%",
    },

    label: {
        color: colors.black,
        fontSize: 14,
        fontWeight: "700",
        marginBottom: spacing.sm,
        marginTop: spacing.md,
    },

    input: {
        height: 52,
        borderRadius: radius.md,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.grayLight,
        paddingHorizontal: spacing.md,
        color: colors.black,
        fontSize: 16,
    },

    button: {
        height: 54,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: spacing.xl,
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    buttonText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: "800",
    },
});