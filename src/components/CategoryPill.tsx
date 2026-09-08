import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

import { colors, radius, spacing } from "../theme";
import { Category } from "../types";

type CategoryPillProps = {
    category: Category | "todos";
    label: string;
    selected: boolean;
    onPress: () => void;
};

export function CategoryPill({
    label,
    selected,
    onPress,
}: CategoryPillProps) {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                selected && styles.selected,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text
                style={[
                    styles.text,
                    selected && styles.selectedText,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.round,
        borderWidth: 1,
        borderColor: colors.grayLight,
        backgroundColor: colors.white,
        marginRight: spacing.sm,
    },

    selected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    text: {
        color: colors.grayDark,
        fontSize: 14,
        fontWeight: "600",
    },

    selectedText: {
        color: colors.white,
    },
});