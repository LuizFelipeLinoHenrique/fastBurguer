import { useMemo, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    CompositeScreenProps,
} from "@react-navigation/native";

import {
    BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { CategoryPill } from "../components/CategoryPill";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";

import {
    MainTabsParamList,
} from "../navigation/MainTabs";

import {
    RootStackParamList,
} from "../navigation/RootNavigator";

import {
    colors,
    fontSize,
    spacing,
} from "../theme";

import { Category } from "../types";

type ProductsScreenProps =
    CompositeScreenProps<
        BottomTabScreenProps<
            MainTabsParamList,
            "Products"
        >,
        NativeStackScreenProps<RootStackParamList>
    >;

type FilterCategory =
    | Category
    | "todos";

const categories: {
    value: FilterCategory;
    label: string;
}[] = [
        {
            value: "todos",
            label: "Todos",
        },
        {
            value: "burgers",
            label: "Burgers",
        },
        {
            value: "acompanhamentos",
            label: "Acompanhamentos",
        },
        {
            value: "bebidas",
            label: "Bebidas",
        },
        {
            value: "sobremesas",
            label: "Sobremesas",
        },
    ];

export function ProductsScreen({
    navigation,
}: ProductsScreenProps) {
    const [selectedCategory, setSelectedCategory] =
        useState<FilterCategory>("todos");

    const filteredProducts = useMemo(() => {
        if (selectedCategory === "todos") {
            return products;
        }

        return products.filter(
            (product) =>
                product.category ===
                selectedCategory,
        );
    }, [selectedCategory]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Cardápio
            </Text>

            <Text style={styles.subtitle}>
                Escolha seus favoritos
            </Text>

            <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item.value}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                    styles.categories
                }
                renderItem={({ item }) => (
                    <CategoryPill
                        category={item.value}
                        label={item.label}
                        selected={
                            selectedCategory ===
                            item.value
                        }
                        onPress={() =>
                            setSelectedCategory(
                                item.value,
                            )
                        }
                    />
                )}
            />

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.products
                }
                renderItem={({ item }) => (
                    <View
                        style={styles.productContainer}
                    >
                        <ProductCard
                            product={item}
                            onPress={() =>
                                navigation.navigate(
                                    "ProductDetail",
                                    {
                                        productId: item.id,
                                    },
                                )
                            }
                        />
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        Nenhum produto encontrado.
                    </Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream,
        paddingTop: spacing.lg,
    },

    title: {
        fontSize: fontSize.title,
        color: colors.black,
        fontWeight: "900",
        paddingHorizontal: spacing.md,
    },

    subtitle: {
        color: colors.grayDark,
        fontSize: fontSize.md,
        paddingHorizontal: spacing.md,
        marginTop: spacing.xs,
    },

    categories: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.lg,
    },

    products: {
        paddingHorizontal: spacing.sm,
        paddingBottom: spacing.lg,
    },

    productContainer: {
        width: "50%",
    },

    empty: {
        textAlign: "center",
        color: colors.grayDark,
        marginTop: spacing.xl,
    },
});