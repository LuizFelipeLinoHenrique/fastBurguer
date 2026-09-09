import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CartButton } from "../components/CartButton";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { MainTabsParamList } from "../navigation/MainTabs";
import { RootStackParamList } from "../navigation/RootNavigator";
import { colors, fontSize, radius, spacing } from "../theme";

type HomeScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabsParamList, "Home">,
    NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({ navigation }: HomeScreenProps) {
    const highlights = products.slice(0, 3);
    const popularItems = products.slice(3, 7);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Olá! 👋</Text>
                        <Text style={styles.welcome}>O que vamos pedir hoje?</Text>
                    </View>

                    <CartButton onPress={() => navigation.navigate("Cart")} />
                </View>

                {/* Banner */}
                <TouchableOpacity
                    style={styles.banner}
                    activeOpacity={0.9}
                    onPress={() =>
                        navigation.navigate("MainTabs", {
                            screen: "Products",
                        })
                    }
                >
                    <View style={styles.bannerText}>
                        <Text style={styles.bannerSmall}>OFERTA ESPECIAL</Text>
                        <Text style={styles.bannerTitle}>Combo Fast</Text>
                        <Text style={styles.bannerDescription}>
                            Hambúrguer + batata + bebida
                        </Text>
                        <Text style={styles.bannerPrice}>
                            A partir de R$ 34,90
                        </Text>
                    </View>

                    <Text style={styles.bannerEmoji}>🍔</Text>
                </TouchableOpacity>

                {/* Destaques */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Destaques</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("MainTabs", {
                                screen: "Products",
                            })
                        }
                    >
                        <Text style={styles.seeAll}>Ver cardápio</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    horizontal
                    data={highlights}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                    renderItem={({ item }) => (
                        <View style={styles.productWrapper}>
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
                />

                {/* Mais Pedidos */}
                <View style={[styles.sectionHeader, styles.secondSection]}>
                    <Text style={styles.sectionTitle}>Mais Pedidos</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("MainTabs", {
                                screen: "Products",
                            })
                        }
                    >
                        <Text style={styles.seeAll}>Ver todos</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.popularGrid}>
                    {popularItems.map((item) => (
                        <View key={item.id} style={styles.gridItem}>
                            <ProductCard
                                product={item}
                                onPress={() =>
                                    navigation.navigate("ProductDetail", {
                                        productId: item.id,
                                    })
                                }
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream,
    },

    scrollContent: {
        paddingTop: spacing.md,
        paddingBottom: spacing.xxl,
    },

    header: {
        paddingHorizontal: spacing.md,
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
        marginHorizontal: spacing.md,
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
        paddingHorizontal: spacing.md,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.sm,
    },

    secondSection: {
        marginTop: spacing.lg,
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

    horizontalList: {
        paddingHorizontal: spacing.sm,
    },

    productWrapper: {
        width: 230,
    },

    popularGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: spacing.sm,
    },

    gridItem: {
        width: "50%",
    },
});