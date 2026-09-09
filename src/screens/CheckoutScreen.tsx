import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { RootStackParamList } from "../navigation/RootNavigator";
import {
    colors,
    fontSize,
    radius,
    spacing,
} from "../theme";
import { PaymentMethod } from "../types";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "Checkout"
>;

const paymentMethods: PaymentMethod[] = [
    "PIX",
    "Cartão",
    "Dinheiro",
];

export function CheckoutScreen({ navigation }: Props) {
    const insets = useSafeAreaInsets();
    const { items, total, subtotal, shipping, clearCart } = useCart();
    const { addOrder } = useOrders();

    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState<PaymentMethod>("PIX");
    const [loading, setLoading] = useState(false);

    function handleConfirmOrder() {
        if (items.length === 0) {
            Alert.alert(
                "Carrinho vazio",
                "Adicione itens ao carrinho antes de finalizar a compra.",
            );
            navigation.goBack();
            return;
        }

        if (!address.trim()) {
            Alert.alert(
                "Atenção",
                "Informe o endereço de entrega.",
            );
            return;
        }

        if (address.trim().length < 8) {
            Alert.alert(
                "Atenção",
                "Informe um endereço completo com rua e número.",
            );
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const orderNumber = `FB${Date.now().toString().slice(-6)}`;

            const createdOrder = addOrder({
                orderNumber,
                items: [...items],
                subtotal,
                shipping,
                total,
                address: address.trim(),
                paymentMethod: payment,
                createdAt: Date.now(),
            });

            clearCart();

            setLoading(false);

            navigation.replace("OrderStatus", {
                orderId: createdOrder.id,
                orderNumber: createdOrder.orderNumber,
                total: createdOrder.total,
            });
        }, 800);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
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

                <Text style={styles.headerTitle}>Checkout</Text>

                <View style={styles.placeholder} />
            </View>

            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: Math.max(insets.bottom + 20, spacing.xxl) },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>Endereço de entrega</Text>

                <TextInput
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Rua, número, bairro, cidade"
                    placeholderTextColor={colors.gray}
                    multiline
                    style={styles.addressInput}
                />

                <Text style={styles.sectionTitle}>Forma de pagamento</Text>

                <View style={styles.paymentList}>
                    {paymentMethods.map((method) => {
                        const selected = payment === method;

                        return (
                            <TouchableOpacity
                                key={method}
                                style={[
                                    styles.payment,
                                    selected && styles.paymentSelected,
                                ]}
                                onPress={() => setPayment(method)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.paymentLeft}>
                                    <Ionicons
                                        name={
                                            method === "PIX"
                                                ? "qr-code-outline"
                                                : method === "Cartão"
                                                  ? "card-outline"
                                                  : "cash-outline"
                                        }
                                        size={23}
                                        color={
                                            selected
                                                ? colors.primary
                                                : colors.grayDark
                                        }
                                    />

                                    <Text
                                        style={[
                                            styles.paymentText,
                                            selected &&
                                                styles.paymentTextSelected,
                                        ]}
                                    >
                                        {method}
                                    </Text>
                                </View>

                                <View
                                    style={[
                                        styles.radio,
                                        selected && styles.radioSelected,
                                    ]}
                                >
                                    {selected && (
                                        <View style={styles.radioInner} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text style={styles.sectionTitle}>Resumo do pedido</Text>

                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Total dos produtos
                        </Text>

                        <Text style={styles.summaryValue}>
                            R$ {subtotal.toFixed(2).replace(".", ",")}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Frete</Text>

                        <Text style={styles.summaryValue}>
                            R$ {shipping.toFixed(2).replace(".", ",")}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total</Text>

                        <Text style={styles.totalValue}>
                            R$ {total.toFixed(2).replace(".", ",")}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        loading && styles.buttonDisabled,
                    ]}
                    onPress={handleConfirmOrder}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>
                        {loading ? "Confirmando..." : "Confirmar pedido"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
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

    headerTitle: {
        fontSize: fontSize.xl,
        color: colors.black,
        fontWeight: "900",
    },

    placeholder: {
        width: 26,
    },

    content: {
        padding: spacing.lg,
    },

    sectionTitle: {
        color: colors.black,
        fontSize: 18,
        fontWeight: "900",
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },

    addressInput: {
        minHeight: 110,
        backgroundColor: colors.white,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.grayLight,
        padding: spacing.md,
        color: colors.black,
        textAlignVertical: "top",
    },

    paymentList: {
        gap: spacing.sm,
    },

    payment: {
        minHeight: 58,
        backgroundColor: colors.white,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: colors.grayLight,
    },

    paymentSelected: {
        borderColor: colors.primary,
    },

    paymentLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    paymentText: {
        color: colors.grayDark,
        fontSize: 15,
        fontWeight: "600",
    },

    paymentTextSelected: {
        color: colors.primary,
    },

    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: colors.gray,
        alignItems: "center",
        justifyContent: "center",
    },

    radioSelected: {
        borderColor: colors.primary,
    },

    radioInner: {
        width: 11,
        height: 11,
        borderRadius: 6,
        backgroundColor: colors.primary,
    },

    summary: {
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: spacing.lg,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.sm,
    },

    summaryLabel: {
        color: colors.grayDark,
    },

    summaryValue: {
        color: colors.black,
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