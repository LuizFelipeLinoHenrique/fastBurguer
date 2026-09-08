import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useCart } from "../context/CartoonContext";
import { products } from "../data/products";
import { RootStackParamList } from "../navigation/RootNavigator";
import {
    colors,
    radius,
    spacing
} from "../theme";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "ProductDetail"
>;

export function ProductDetailScreen({
    navigation,
    route,
}: Props) {
    const { addToCart } = useCart();

    const product = products.find(
        (item) => item.id === route.params.productId,
    );

    if (!product) {
        return (
            <View style={styles.error}>
                <Text style={styles.errorText}>
                    Produto não encontrado.
                </Text>
            </View>
        );
    }

    function handleAddToCart() {
        addToCart(product);
        navigation.navigate("Cart");
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                    />

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backText}>‹</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.category}>
                        {product.category.toUpperCase()}
                    </Text>

                    <Text style={styles.name}>
                        {product.name}
                    </Text>

                    <Text style={styles.price}>
                        R$ {product.price.toFixed(2).replace(".", ",")}
                    </Text>

                    <Text style={styles.descriptionTitle}>
                        Descrição
                    </Text>

                    <Text style={styles.description}>
                        {product.description}
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.info}>
                        Preparado na hora com ingredientes
                        selecionados.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddToCart}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>
                        Adicionar ao carrinho
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
        top: 50,
        left: spacing.md,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },

    backText: {
        color: colors.black,
        fontSize: 35,
        lineHeight: 40,
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
        fontSize: 23,
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

    info: {
        color: colors.grayDark,
        fontSize: 14,
        lineHeight: 21,
    },

    bottom: {
        padding: spacing.md,
        backgroundColor: colors.white,
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
    },

    errorText: {
        color: colors.black,
        fontSize: 18,
    },
});