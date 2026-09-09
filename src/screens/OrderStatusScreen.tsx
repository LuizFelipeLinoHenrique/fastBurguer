import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useOrders } from "../context/OrdersContext";
import { RootStackParamList } from "../navigation/RootNavigator";
import { colors, fontSize, radius, spacing } from "../theme";
import { OrderStatus } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "OrderStatus">;

const statuses: OrderStatus[] = ["Em preparo", "Entregue"];

export function OrderStatusScreen({ navigation, route }: Props) {
    const { getOrderById, getEffectiveStatus, getTimeRemainingSeconds } =
        useOrders();
    const [, setTick] = useState(0);

    const orderId = route.params.orderId || route.params.orderNumber;
    const order = getOrderById(orderId);

    // Refresh every second for real-time status update & countdown timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTick((t) => t + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const effectiveStatus = order
        ? getEffectiveStatus(order)
        : ("Em preparo" as OrderStatus);

    const timeRemainingSeconds = order ? getTimeRemainingSeconds(order) : 120;
    const isPreparing = effectiveStatus === "Em preparo";

    function formatTimer(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    function handleBackToHome() {
        navigation.reset({
            index: 0,
            routes: [{ name: "MainTabs" }],
        });
    }

    function handleGoToOrders() {
        navigation.navigate("Orders");
    }

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={[
                        styles.statusHeaderIcon,
                        isPreparing
                            ? styles.statusHeaderIconPreparing
                            : styles.statusHeaderIconDelivered,
                    ]}
                >
                    <Ionicons
                        name={
                            isPreparing
                                ? "fast-food-outline"
                                : "checkmark-done-circle-outline"
                        }
                        size={52}
                        color={colors.white}
                    />
                </View>

                <Text style={styles.title}>
                    {isPreparing
                        ? "Pedido em Preparo!"
                        : "Pedido Entregue! 🎉"}
                </Text>

                <Text style={styles.subtitle}>
                    {isPreparing
                        ? "Seu hambúrguer está sendo preparado com muito carinho."
                        : "Seu pedido foi entregue. Bom apetite!"}
                </Text>

                {/* Countdown Box */}
                {isPreparing && (
                    <View style={styles.timerBox}>
                        <Ionicons
                            name="time-outline"
                            size={22}
                            color="#D97706"
                        />
                        <Text style={styles.timerLabel}>Tempo para entrega:</Text>
                        <Text style={styles.timerValue}>
                            {formatTimer(timeRemainingSeconds)}
                        </Text>
                    </View>
                )}

                {/* Order Summary Card */}
                <View style={styles.orderCard}>
                    <View style={styles.orderHeaderRow}>
                        <View>
                            <Text style={styles.orderLabel}>
                                Número do pedido
                            </Text>
                            <Text style={styles.orderNumber}>
                                #{order?.orderNumber || route.params.orderNumber}
                            </Text>
                        </View>

                        <Text style={styles.totalValueHeader}>
                            R${" "}
                            {(order?.total || route.params.total)
                                .toFixed(2)
                                .replace(".", ",")}
                        </Text>
                    </View>

                    {order && (
                        <>
                            <View style={styles.divider} />
                            <Text style={styles.sectionHeading}>
                                Itens do Pedido:
                            </Text>
                            <View style={styles.itemsList}>
                                {order.items.map((item) => (
                                    <View
                                        key={item.product.id}
                                        style={styles.itemRow}
                                    >
                                        <Text style={styles.itemName}>
                                            {item.quantity}x {item.product.name}
                                        </Text>
                                        <Text style={styles.itemPrice}>
                                            R${" "}
                                            {(
                                                item.product.price *
                                                item.quantity
                                            )
                                                .toFixed(2)
                                                .replace(".", ",")}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.divider} />
                            <Text style={styles.infoLine}>
                                📍 <Text style={styles.infoBold}>Endereço:</Text>{" "}
                                {order.address}
                            </Text>
                            <Text style={styles.infoLine}>
                                💳 <Text style={styles.infoBold}>Pagamento:</Text>{" "}
                                {order.paymentMethod}
                            </Text>
                        </>
                    )}
                </View>

                {/* Status Timeline */}
                <View style={styles.statusCard}>
                    <Text style={styles.sectionHeading}>Status do Pedido:</Text>

                    {statuses.map((statusName, index) => {
                        const isCompleted =
                            index === 0
                                ? true
                                : effectiveStatus === "Entregue";

                        const isCurrent = effectiveStatus === statusName;

                        return (
                            <View key={statusName} style={styles.statusRow}>
                                <View style={styles.statusIndicator}>
                                    <View
                                        style={[
                                            styles.circle,
                                            isCompleted &&
                                                styles.circleCompleted,
                                        ]}
                                    >
                                        {isCompleted && (
                                            <Text style={styles.circleCheck}>
                                                ✓
                                            </Text>
                                        )}
                                    </View>

                                    {index < statuses.length - 1 && (
                                        <View
                                            style={[
                                                styles.line,
                                                effectiveStatus === "Entregue" &&
                                                    styles.lineCompleted,
                                            ]}
                                        />
                                    )}
                                </View>

                                <View style={styles.statusTextContainer}>
                                    <Text
                                        style={[
                                            styles.statusText,
                                            isCompleted &&
                                                styles.statusTextCompleted,
                                        ]}
                                    >
                                        {statusName}
                                    </Text>

                                    {isCurrent && (
                                        <Text style={styles.currentText}>
                                            {statusName === "Em preparo"
                                                ? "Em andamento (2 min)"
                                                : "Finalizado"}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.buttonOutline}
                        onPress={handleGoToOrders}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name="receipt-outline"
                            size={20}
                            color={colors.primary}
                        />
                        <Text style={styles.buttonOutlineText}>
                            Ver meus pedidos
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleBackToHome}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>
                            Voltar para o início
                        </Text>
                    </TouchableOpacity>
                </View>
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

    statusHeaderIcon: {
        width: 90,
        height: 90,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
    },

    statusHeaderIconPreparing: {
        backgroundColor: "#D97706",
    },

    statusHeaderIconDelivered: {
        backgroundColor: colors.green,
    },

    title: {
        color: colors.black,
        fontSize: fontSize.xl,
        fontWeight: "900",
        marginTop: spacing.lg,
        textAlign: "center",
    },

    subtitle: {
        color: colors.grayDark,
        textAlign: "center",
        lineHeight: 21,
        marginTop: spacing.xs,
    },

    timerBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEF3C7",
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.md,
        marginTop: spacing.md,
        gap: 6,
    },

    timerLabel: {
        color: "#92400E",
        fontWeight: "700",
        fontSize: 14,
    },

    timerValue: {
        color: "#B45309",
        fontWeight: "900",
        fontSize: 16,
    },

    orderCard: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginTop: spacing.lg,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },

    orderHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    orderLabel: {
        color: colors.grayDark,
        fontSize: 12,
    },

    orderNumber: {
        color: colors.primary,
        fontSize: 22,
        fontWeight: "900",
        marginTop: 2,
    },

    totalValueHeader: {
        color: colors.black,
        fontSize: 20,
        fontWeight: "900",
    },

    divider: {
        height: 1,
        backgroundColor: colors.grayLight,
        marginVertical: spacing.md,
    },

    sectionHeading: {
        color: colors.black,
        fontSize: 15,
        fontWeight: "800",
        marginBottom: spacing.xs,
    },

    itemsList: {
        gap: 6,
        marginTop: 4,
    },

    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    itemName: {
        color: colors.black,
        fontSize: 14,
    },

    itemPrice: {
        color: colors.grayDark,
        fontSize: 14,
        fontWeight: "600",
    },

    infoLine: {
        color: colors.grayDark,
        fontSize: 13,
        marginTop: 4,
        lineHeight: 19,
    },

    infoBold: {
        color: colors.black,
        fontWeight: "700",
    },

    statusCard: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginTop: spacing.md,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },

    statusRow: {
        flexDirection: "row",
        minHeight: 52,
        marginTop: spacing.xs,
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

    buttonsContainer: {
        width: "100%",
        marginTop: spacing.lg,
        gap: spacing.sm,
    },

    buttonOutline: {
        width: "100%",
        height: 52,
        borderRadius: radius.md,
        borderWidth: 1.5,
        borderColor: colors.primary,
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    buttonOutlineText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "800",
    },

    button: {
        width: "100%",
        height: 54,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "800",
    },
});