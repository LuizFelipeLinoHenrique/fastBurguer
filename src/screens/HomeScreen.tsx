import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
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

import { CartButton } from "../components/CartButton";
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
    radius,
    spacing,
} from "../theme";

type HomeScreenProps =
    CompositeScreenProps<
        BottomTabScreenProps<
            MainTabsParamList,
            "Home"
        >,
        NativeStackScreenProps<RootStackParamList>
    >;

export function HomeScreen({
    navigation,
}: HomeScreenProps) {
    const highlights = products.slice(0, 4);

    return (
        <View style={styles.container}>
            <FlatList
                data={highlights}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                    styles.horizontalList
                }
                ListHeaderComponent={
                    <View>
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.greeting}>
                                    Olá! 👋
                                </Text>

                                <Text style={styles.welcome}>
                                    O que vamos pedir hoje?
                                </Text>
                            </View>

                            <CartButton
                                onPress={() =>
                                    navigation.navigate("Cart")
                                }
                            />
                        </View>

                        <View style={styles.banner}>
                            <View style={styles.bannerText}>
                                <Text style={styles.bannerSmall}>
                                    OFERTA ESPECIAL
                                </Text>

                                <Text style={styles.bannerTitle}>
                                    Combo Fast
                                </Text>

                                <Text
                                    style={styles.bannerDescription}
                                >
                                    Hambúrguer + batata + bebida
                                </Text>

                                <Text style={styles.bannerPrice}>
                                    A partir de R$ 34,90
                                </Text>
                            </View>

                            <Text style={styles.bannerEmoji}>
                                🍔
                            </Text>
                        </View>

                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                Destaques
                            </Text>

                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate(
                                        "MainTabs",
                                        {
                                            screen: "Products",
                                        },
                                    )
                                }
                            >
                                <Text style={styles.seeAll}>
                                    Ver cardápio
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.productWrapper}>
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
                ListFooterComponent={
                    <View style={styles.bottomSpace} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream,
    },

    horizontalList: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.lg,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: spacing.lg,
    },

    greeting: {
        fontSize: fontSize.lg,
        color: colors.grayDark,
    },

    welcome: {
        fontSize: fontSize.xl,
        color: colors.black,
        fontWeight: "900",
        marginTop: 3,
    },

    banner: {
        backgroundColor: colors.primary,
        minHeight: 175,
        borderRadius: radius.xl,
        padding: spacing.lg,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        marginBottom: spacing.xl,
    },

    bannerText: {
        flex: 1,
    },

    bannerSmall: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "800",
    },

    bannerTitle: {
        color: colors.white,
        fontSize: 30,
        fontWeight: "900",
        marginTop: 4,
    },

    bannerDescription: {
        color: colors.white,
        fontSize: 13,
        marginTop: 5,
    },

    bannerPrice: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "800",
        marginTop: spacing.sm,
    },

    bannerEmoji: {
        fontSize: 78,
        marginLeft: spacing.sm,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.sm,
    },

    sectionTitle: {
        color: colors.black,
        fontSize: fontSize.xl,
        fontWeight: "900",
    },

    seeAll: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "700",
    },

    productWrapper: {
        width: 230,
    },

    bottomSpace: {
        width: spacing.md,
    },
});