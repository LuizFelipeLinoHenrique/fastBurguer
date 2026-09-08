import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { colors, radius, spacing } from "../theme";
import { Product } from "../types";

type ProductCardProps = {
    product: Product;
    onPress: () => void;
};

export function ProductCard({
    product,
    onPress,
}: ProductCardProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <Image
                source={{ uri: product.image }}
                style={styles.image}
            />

            <View style={styles.content}>
                <Text
                    style={styles.name}
                    numberOfLines={1}
                >
                    {product.name}
                </Text>

                <Text
                    style={styles.description}
                    numberOfLines={2}
                >
                    {product.description}
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.price}>
                        R$ {product.price.toFixed(2).replace(".", ",")}
                    </Text>

                    <View style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        overflow: "hidden",
        margin: spacing.xs,
        elevation: 3,
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    image: {
        width: "100%",
        height: 145,
    },

    content: {
        padding: spacing.md,
    },

    name: {
        fontSize: 17,
        fontWeight: "800",
        color: colors.black,
    },

    description: {
        marginTop: spacing.xs,
        color: colors.grayDark,
        fontSize: 12,
        lineHeight: 17,
    },

    footer: {
        marginTop: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    price: {
        color: colors.primary,
        fontSize: 17,
        fontWeight: "800",
    },

    addButton: {
        width: 32,
        height: 32,
        borderRadius: radius.round,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    addButtonText: {
        color: colors.white,
        fontSize: 23,
        lineHeight: 25,
        fontWeight: "500",
    },
});