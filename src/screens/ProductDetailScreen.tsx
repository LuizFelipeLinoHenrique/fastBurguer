import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { RootStackParamList } from "../navigation/RootNavigator";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "ProductDetail"
>;

export function ProductDetailScreen({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const product = products.find(
        (item) => item.id === route.params.productId,
    );

    if (!product) {
        return (
            <View style={styles.error}>
                <Text style={styles.errorText}>Produto não encontrado.</Text>
                <TouchableOpacity
                    style={styles.backButtonSimple}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonSimpleText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function handleAddToCart() {
        if (!product) {
            return;
        }

        addToCart(product, quantity);
        navigation.navigate("Cart");
    }

    const totalPrice = (product.price * quantity).toFixed(2).replace(".", ",");

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                    />

                    <TouchableOpacity
                        style={[
                            styles.backButton,
                            { top: Math.max(insets.top + 10, 44) },
                        ]}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={colors.black}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.category}>
                        {product.category.toUpperCase()}
                    </Text>

                    <Text style={styles.name}>{product.name}</Text>

                    <Text style={styles.price}>
                        R$ {product.price.toFixed(2).replace(".", ",")}
                    </Text>

                    <Text style={styles.descriptionTitle}>Descrição</Text>

                    <Text style={styles.description}>{product.description}</Text>

                    <View style={styles.divider} />

                    <View style={styles.quantitySection}>
                        <Text style={styles.quantityTitle}>Quantidade</Text>

                        <View style={styles.quantityControls}>
                            <TouchableOpacity
                                style={[
                                    styles.quantityBtn,
                                    quantity <= 1 && styles.quantityBtnDisabled,
                                ]}
                                onPress={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                                disabled={quantity <= 1}
                            >
                                <Text style={styles.quantityBtnText}>−</Text>
                            </TouchableOpacity>

                            <Text style={styles.quantityValue}>{quantity}</Text>

                            <TouchableOpacity
                                style={styles.quantityBtn}
                                onPress={() => setQuantity((q) => q + 1)}
                            >
                                <Text style={styles.quantityBtnText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.info}>
                        Preparado na hora com ingredientes selecionados.
                    </Text>
                </View>
            </ScrollView>

            <View
                style={[
                    styles.bottom,
                    { paddingBottom: Math.max(insets.bottom, spacing.md) },
                ]}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddToCart}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>
                        Adicionar • R$ {totalPrice}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream,
    },

    imageContainer: {
        position: "relative",
    },

    image: {
        width: "100%",
        height: 330,
    },

    backButton: {
        position: "absolute",
        left: spacing.md,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },

    content: {
        padding: spacing.lg,
    },

    category: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 1,
    },

    name: {
        color: colors.black,
        fontSize: 30,
        fontWeight: "900",
        marginTop: spacing.xs,
    },

    price: {
        color: colors.primary,
        fontSize: 24,
        fontWeight: "900",
        marginTop: spacing.sm,
    },

    descriptionTitle: {
        color: colors.black,
        fontSize: 18,
        fontWeight: "800",
        marginTop: spacing.xl,
    },

    description: {
        color: colors.grayDark,
        fontSize: 16,
        lineHeight: 24,
        marginTop: spacing.sm,
    },

    divider: {
        height: 1,
        backgroundColor: colors.grayLight,
        marginVertical: spacing.lg,
    },

    quantitySection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    quantityTitle: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "700",
    },

    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.grayLight,
        padding: 4,
    },

    quantityBtn: {
        width: 36,
        height: 36,
        borderRadius: radius.sm,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    quantityBtnDisabled: {
        backgroundColor: colors.grayLight,
    },

    quantityBtnText: {
        color: colors.white,
        fontSize: 20,
        lineHeight: 22,
        fontWeight: "700",
    },

    quantityValue: {
        minWidth: 40,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "800",
        color: colors.black,
    },

    info: {
        color: colors.grayDark,
        fontSize: 14,
        lineHeight: 21,
    },

    bottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.md,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.grayLight,
    },

    button: {
        height: 54,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: "800",
    },

    error: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.cream,
        padding: spacing.lg,
    },

    errorText: {
        color: colors.black,
        fontSize: 18,
        fontWeight: "700",
    },

    backButtonSimple: {
        marginTop: spacing.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.primary,
        borderRadius: radius.md,
    },

    backButtonSimpleText: {
        color: colors.white,
        fontWeight: "700",
    },
});