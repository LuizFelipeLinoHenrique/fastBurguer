import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useCart } from "../context/CartContext";
import { colors, radius } from "../theme";

type CartButtonProps = {
    onPress: () => void;
};

export function CartButton({ onPress }: CartButtonProps) {
    const { totalItems } = useCart();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Ionicons
                name="cart-outline"
                size={27}
                color={colors.black}
            />

            {totalItems > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {totalItems > 99 ? "99+" : totalItems}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 46,
        height: 46,
        borderRadius: radius.round,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },

    badge: {
        position: "absolute",
        right: -2,
        top: -2,
        minWidth: 20,
        height: 20,
        borderRadius: radius.round,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
    },

    badgeText: {
        color: colors.white,
        fontSize: 11,
        fontWeight: "700",
    },
});