import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useCart } from "../context/CartoonContext";
import { RootStackParamList } from "../navigation/RootNavigator";
import {
    colors,
    fontSize,
    radius,
    spacing,
} from "../theme";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "Cart"
>;

export function CartScreen({
    navigation,
}: Props) {
    const {
        items,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        subtotal,
        shipping,
        total,
    } = useCart();

    function money(value: number) {
        return `R$ ${value.toFixed(2).replace(".", ",")}`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={26}
                        color={colors.black}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Carrinho
                </Text>

                <View style={styles.placeholder} />
            </View>

            {items.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyEmoji}>
                        🛒
                    </Text>

                    <Text style={styles.emptyTitle}>
                        Seu carrinho está vazio
                    </Text>

                    <Text style={styles.emptyText}>
                        Adicione alguns produtos deliciosos!
                    </Text>

                    <TouchableOpacity
                        style={styles.emptyButton}
                        onPress={() =>
                            navigation.navigate("MainTabs")
                        }
                    >
                        <Text style={styles.emptyButtonText}>
                            Ver cardápio
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <FlatList
                        data={items}
                        keyExtractor={(item) =>
                            item.product.id
                        }
                        contentContainerStyle={
                            styles.listContent
                        }
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.itemEmoji}>
                                    🍔
                                </Text>

                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>
                                        {item.product.name}
                                    </Text>

                                    <Text style={styles.itemPrice}>
                                        {money(item.product.price)}
                                    </Text>

                                    <View style={styles.quantityRow}>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() =>
                                                decreaseQuantity(
                                                    item.product.id,
                                                )
                                            }
                                        >
                                            <Text style={styles.quantityText}>
                                                −
                                            </Text>
                                        </TouchableOpacity>

                                        <Text style={styles.quantity}>
                                            {item.quantity}
                                        </Text>

                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() =>
                                                increaseQuantity(
                                                    item.product.id,
                                                )
                                            }
                                        >
                                            <Text style={styles.quantityText}>
                                                +
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.itemRight}>
                                    <Text style={styles.itemTotal}>
                                        {money(
                                            item.product.price *
                                            item.quantity,
                                        )}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() =>
                                            removeFromCart(
                                                item.product.id,
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name="trash-outline"
                                            size={21}
                                            color={colors.danger}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />

                    <View style={styles.summary}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>
                                Subtotal
                            </Text>

                            <Text style={styles.summaryValue}>
                                {money(subtotal)}
                            </Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>
                                Frete
                            </Text>

                            <Text style={styles.summaryValue}>
                                {money(shipping)}
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.summaryRow}>
                            <Text style={styles.totalLabel}>
                                Total
                            </Text>

                            <Text style={styles.totalValue}>
                                {money(total)}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={() =>
                                navigation.navigate("Checkout")
                            }
                            activeOpacity={0.8}
                        >
                            <Text style={styles.checkoutText}>
                                Finalizar pedido
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
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
        height: 90,
        paddingHorizontal: spacing.md,
        paddingTop: 35,
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
        paddingBottom: spacing.lg,
    },

    item: {
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        flexDirection: "row",
        alignItems: "center",
    },

    itemEmoji: {
        width: 60,
        height: 60,
        borderRadius: radius.md,
        backgroundColor: colors.cream,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 32,
        overflow: "hidden",
    },

    itemInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },

    itemName: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "800",
    },

    itemPrice: {
        color: colors.grayDark,
        fontSize: 13,
        marginTop: 3,
    },

    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.sm,
    },

    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    quantityText: {
        color: colors.white,
        fontSize: 20,
        lineHeight: 22,
        fontWeight: "600",
    },

    quantity: {
        minWidth: 30,
        textAlign: "center",
        fontWeight: "700",
        color: colors.black,
    },

    itemRight: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        alignSelf: "stretch",
    },

    itemTotal: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: "800",
    },

    summary: {
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.sm,
    },

    summaryLabel: {
        color: colors.grayDark,
        fontSize: 14,
    },

    summaryValue: {
        color: colors.black,
        fontSize: 14,
        fontWeight: "600",
    },

    divider: {
        height: 1,
        backgroundColor: colors.grayLight,
        marginVertical: spacing.sm,
    },

    totalLabel: {
        color: colors.black,
        fontSize: 19,
        fontWeight: "900",
    },

    totalValue: {
        color: colors.primary,
        fontSize: 21,
        fontWeight: "900",
    },

    checkoutButton: {
        height: 54,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: spacing.md,
    },

    checkoutText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: "800",
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
});