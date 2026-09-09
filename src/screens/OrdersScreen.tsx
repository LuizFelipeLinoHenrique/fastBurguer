import { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useOrders } from "../context/OrdersContext";
import { RootStackParamList } from "../navigation/RootNavigator";
import { colors, fontSize, radius, spacing } from "../theme";
import { Order } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Orders">;

export function OrdersScreen({ navigation }: Props) {
    const insets = useSafeAreaInsets();
    const { orders, getEffectiveStatus, getTimeRemainingSeconds } = useOrders();
    const [, setTick] = useState(0);

    // Update every second so live status and timers update automatically
    useEffect(() => {
        const interval = setInterval(() => {
            setTick((t) => t + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function formatDate(timestamp: number): string {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}/${month}/${date.getFullYear()} às ${hours}:${minutes}`;
    }

    function formatTimer(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.header,
                    { paddingTop: Math.max(insets.top + 8, 24) },
                ]}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="arrow-back"
                        size={26}
                        color={colors.black}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Meus Pedidos</Text>

                <View style={styles.placeholder} />
            </View>

            {orders.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyEmoji}>📋</Text>
                    <Text style={styles.emptyTitle}>
                        Nenhum pedido encontrado
                    </Text>
                    <Text style={styles.emptyText}>
                        Você ainda não fez nenhum pedido no FastBurguer.
                    </Text>

                    <TouchableOpacity
                        style={styles.emptyButton}
                        onPress={() =>
                            navigation.navigate("MainTabs", {
                                screen: "Products",
                            })
                        }
                    >
                        <Text style={styles.emptyButtonText}>Ver cardápio</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={[
                        styles.listContent,
                        {
                            paddingBottom: Math.max(
                                insets.bottom + spacing.md,
                                spacing.xl,
                            ),
                        },
                    ]}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const status = getEffectiveStatus(item);
                        const isPreparing = status === "Em preparo";
                        const remainingSecs = getTimeRemainingSeconds(item);

                        return (
                            <TouchableOpacity
                                style={styles.orderCard}
                                activeOpacity={0.85}
                                onPress={() =>
                                    navigation.navigate("OrderStatus", {
                                        orderId: item.id,
                                        orderNumber: item.orderNumber,
                                        total: item.total,
                                    })
                                }
                            >
                                <View style={styles.cardHeader}>
                                    <View>
                                        <Text style={styles.orderNumber}>
                                            #{item.orderNumber}
                                        </Text>
                                        <Text style={styles.orderDate}>
                                            {formatDate(item.createdAt)}
                                        </Text>
                                    </View>

                                    <View
                                        style={[
                                            styles.statusBadge,
                                            isPreparing
                                                ? styles.statusPreparing
                                                : styles.statusDelivered,
                                        ]}
                                    >
                                        <Ionicons
                                            name={
                                                isPreparing
                                                    ? "time-outline"
                                                    : "checkmark-circle-outline"
                                            }
                                            size={14}
                                            color={
                                                isPreparing
                                                    ? "#D97706"
                                                    : colors.green
                                            }
                                        />
                                        <Text
                                            style={[
                                                styles.statusText,
                                                isPreparing
                                                    ? styles.statusTextPreparing
                                                    : styles.statusTextDelivered,
                                            ]}
                                        >
                                            {isPreparing
                                                ? `Em preparo (${formatTimer(remainingSecs)})`
                                                : "Entregue"}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.divider} />

                                <View style={styles.itemsSummary}>
                                    {item.items.map((cartItem) => (
                                        <Text
                                            key={cartItem.product.id}
                                            style={styles.itemLine}
                                            numberOfLines={1}
                                        >
                                            • {cartItem.quantity}x{" "}
                                            {cartItem.product.name}
                                        </Text>
                                    ))}
                                </View>

                                <View style={styles.cardFooter}>
                                    <Text style={styles.totalLabel}>
                                        Total: R${" "}
                                        {item.total
                                            .toFixed(2)
                                            .replace(".", ",")}
                                    </Text>

                                    <View style={styles.trackLink}>
                                        <Text style={styles.trackLinkText}>
                                            Rastrear
                                        </Text>
                                        <Ionicons
                                            name="chevron-forward"
                                            size={16}
                                            color={colors.primary}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream,
    },

    header: {
        minHeight: 60,
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.sm,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    title: {
        fontSize: fontSize.xl,
        fontWeight: "900",
        color: colors.black,
    },

    placeholder: {
        width: 26,
    },

    listContent: {
        padding: spacing.md,
    },

    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.xl,
    },

    emptyEmoji: {
        fontSize: 65,
    },

    emptyTitle: {
        color: colors.black,
        fontSize: 22,
        fontWeight: "900",
        marginTop: spacing.lg,
    },

    emptyText: {
        color: colors.grayDark,
        marginTop: spacing.sm,
        textAlign: "center",
    },

    emptyButton: {
        marginTop: spacing.lg,
        backgroundColor: colors.primary,
        borderRadius: radius.md,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
    },

    emptyButtonText: {
        color: colors.white,
        fontWeight: "800",
    },

    orderCard: {
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    orderNumber: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: "900",
    },

    orderDate: {
        color: colors.grayDark,
        fontSize: 12,
        marginTop: 2,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: radius.round,
    },

    statusPreparing: {
        backgroundColor: "#FEF3C7",
    },

    statusDelivered: {
        backgroundColor: "#D1FAE5",
    },

    statusText: {
        fontSize: 12,
        fontWeight: "800",
    },

    statusTextPreparing: {
        color: "#B45309",
    },

    statusTextDelivered: {
        color: "#047857",
    },

    divider: {
        height: 1,
        backgroundColor: colors.grayLight,
        marginVertical: spacing.sm,
    },

    itemsSummary: {
        marginVertical: 4,
        gap: 2,
    },

    itemLine: {
        color: colors.black,
        fontSize: 14,
    },

    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: spacing.sm,
        paddingTop: spacing.xs,
    },

    totalLabel: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "900",
    },

    trackLink: {
        flexDirection: "row",
        alignItems: "center",
    },

    trackLinkText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "800",
    },
});
