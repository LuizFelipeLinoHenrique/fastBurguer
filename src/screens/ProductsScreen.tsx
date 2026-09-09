import { useMemo, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CartButton } from "../components/CartButton";
import { CategoryPill } from "../components/CategoryPill";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { MainTabsParamList } from "../navigation/MainTabs";
import { RootStackParamList } from "../navigation/RootNavigator";
import { colors, fontSize, spacing } from "../theme";
import { Category } from "../types";

type ProductsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabsParamList, "Products">,
    NativeStackScreenProps<RootStackParamList>
>;

type FilterCategory = Category | "todos";

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

export function ProductsScreen({ navigation }: ProductsScreenProps) {
    const [selectedCategory, setSelectedCategory] =
        useState<FilterCategory>("todos");

    const filteredProducts = useMemo(() => {
        if (selectedCategory === "todos") {
            return products;
        }

        return products.filter(
            (product) => product.category === selectedCategory,
        );
    }, [selectedCategory]);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Cardápio</Text>
                    <Text style={styles.subtitle}>Escolha seus favoritos</Text>
                </View>

                <CartButton onPress={() => navigation.navigate("Cart")} />
            </View>

            <View style={styles.categoriesContainer}>
                <FlatList
                    horizontal
                    data={categories}
                    keyExtractor={(item) => item.value}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categories}
                    renderItem={({ item }) => (
                        <CategoryPill
                            category={item.value}
                            label={item.label}
                            selected={selectedCategory === item.value}
                            onPress={() => setSelectedCategory(item.value)}
                        />
                    )}
                />
            </View>

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.products}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <ProductCard
                            product={item}
                            onPress={() =>
                                navigation.navigate("ProductDetail", {
                                    productId: item.id,
                                })
                            }
                        />
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>Nenhum produto encontrado.</Text>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing.md,
        paddingTop: spacing.sm,
        paddingBottom: spacing.xs,
    },

    title: {
        fontSize: fontSize.title,
        color: colors.black,
        fontWeight: "900",
    },

    subtitle: {
        color: colors.grayDark,
        fontSize: fontSize.md,
        marginTop: 2,
    },

    categoriesContainer: {
        marginVertical: spacing.sm,
    },

    categories: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
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