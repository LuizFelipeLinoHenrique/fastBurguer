import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/RootNavigator";
import {
    colors,
    fontSize,
    radius,
    spacing,
} from "../theme";
import { OrderStatus } from "../types";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "OrderStatus"
>;

const statuses: OrderStatus[] = [
    "Preparando",
    "A caminho",
    "Entregue",
];

export function OrderStatusScreen({
    navigation,
    route,
}: Props) {
    const [currentStatus, setCurrentStatus] =
        useState<OrderStatus>("Preparando");

    useEffect(() => {
        const firstTimer = setTimeout(() => {
            setCurrentStatus("A caminho");
        }, 5000);

        const secondTimer = setTimeout(() => {
            setCurrentStatus("Entregue");
        }, 10000);

        return () => {
            clearTimeout(firstTimer);
            clearTimeout(secondTimer);
        };
    }, []);

    const currentIndex = statuses.indexOf(currentStatus);

    function handleBackToHome() {
        navigation.reset({
            index: 0,
            routes: [{ name: "MainTabs" }],
        });
    }

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.successIcon}>
                    <Text style={styles.check}>✓</Text>
                </View>

                <Text style={styles.title}>Pedido confirmado!</Text>

                <Text style={styles.subtitle}>
                    Seu pedido foi recebido e já está sendo preparado.
                </Text>

                <View style={styles.orderCard}>
                    <Text style={styles.orderLabel}>Número do pedido</Text>

                    <Text style={styles.orderNumber}>
                        #{route.params.orderNumber}
                    </Text>

                    <Text style={styles.total}>
                        Total: R${" "}
                        {route.params.total.toFixed(2).replace(".", ",")}
                    </Text>
                </View>

                <View style={styles.statusCard}>
                    {statuses.map((status, index) => {
                        const completed = index <= currentIndex;

                        return (
                            <View key={status} style={styles.statusRow}>
                                <View style={styles.statusIndicator}>
                                    <View
                                        style={[
                                            styles.circle,
                                            completed &&
                                                styles.circleCompleted,
                                        ]}
                                    >
                                        {completed && (
                                            <Text style={styles.circleCheck}>
                                                ✓
                                            </Text>
                                        )}
                                    </View>

                                    {index < statuses.length - 1 && (
                                        <View
                                            style={[
                                                styles.line,
                                                index < currentIndex &&
                                                    styles.lineCompleted,
                                            ]}
                                        />
                                    )}
                                </View>

                                <View style={styles.statusTextContainer}>
                                    <Text
                                        style={[
                                            styles.statusText,
                                            completed &&
                                                styles.statusTextCompleted,
                                        ]}
                                    >
                                        {status}
                                    </Text>

                                    {index === currentIndex && (
                                        <Text style={styles.currentText}>
                                            Status atual
                                        </Text>
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleBackToHome}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Voltar para o início</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream,
    },

    scrollContent: {
        alignItems: "center",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xxl,
    },

    successIcon: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: colors.green,
        alignItems: "center",
        justifyContent: "center",
    },

    check: {
        color: colors.white,
        fontSize: 50,
        fontWeight: "800",
    },

    title: {
        color: colors.black,
        fontSize: fontSize.xl,
        fontWeight: "900",
        marginTop: spacing.lg,
    },

    subtitle: {
        color: colors.grayDark,
        textAlign: "center",
        lineHeight: 21,
        marginTop: spacing.sm,
    },

    orderCard: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginTop: spacing.xl,
        alignItems: "center",
    },

    orderLabel: {
        color: colors.grayDark,
        fontSize: 13,
    },

    orderNumber: {
        color: colors.primary,
        fontSize: 25,
        fontWeight: "900",
        marginTop: 4,
    },

    total: {
        color: colors.black,
        fontWeight: "700",
        marginTop: spacing.sm,
    },

    statusCard: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginTop: spacing.md,
    },

    statusRow: {
        flexDirection: "row",
        minHeight: 58,
    },

    statusIndicator: {
        width: 35,
        alignItems: "center",
    },

    circle: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: colors.grayLight,
        alignItems: "center",
        justifyContent: "center",
    },

    circleCompleted: {
        backgroundColor: colors.green,
        borderColor: colors.green,
    },

    circleCheck: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "800",
    },

    line: {
        width: 2,
        flex: 1,
        backgroundColor: colors.grayLight,
        marginVertical: 3,
    },

    lineCompleted: {
        backgroundColor: colors.green,
    },

    statusTextContainer: {
        marginLeft: spacing.sm,
        paddingTop: 2,
    },

    statusText: {
        color: colors.gray,
        fontSize: 16,
        fontWeight: "700",
    },

    statusTextCompleted: {
        color: colors.black,
    },

    currentText: {
        color: colors.green,
        fontSize: 12,
        marginTop: 2,
        fontWeight: "700",
    },

    button: {
        width: "100%",
        height: 54,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: spacing.lg,
    },

    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "800",
    },
});