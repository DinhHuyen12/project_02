import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useCart } from "@/context/cart-context";
import { useProducts } from "@/context/products-context";

export default function ProductsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const { totalItems } = useCart();
  const { products, categories, loading, error, refresh } = useProducts();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Tất cả" || product.category === selectedCategory;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, search]);

  const openProduct = (productId: number) => {
    router.push({
      pathname: "/product-details",
      params: { productId: String(productId) },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerLabel}>Sản phẩm</Text>
          <Text style={styles.headerTitle}>Memory Gift</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          activeOpacity={0.8}
          onPress={() => router.push("/cart")}
        >
          <Ionicons name="cart-outline" size={20} color="#3b2f2f" />
          {totalItems > 0 ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#7d6a68" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Tìm sản phẩm..."
          placeholderTextColor="#8d7a77"
          style={styles.searchInput}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryChip,
              selectedCategory === item && styles.categoryChipActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.categoryTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.stateBox}>
          <ActivityIndicator color="#d97777" />
          <Text style={styles.stateText}>Đang tải sản phẩm...</Text>
        </View>
      ) : error ? (
        <View style={styles.stateBox}>
          <Text style={styles.stateText}>{error}</Text>
          <TouchableOpacity onPress={refresh} style={styles.retryButton}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.gridWrap}>
        {filteredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.gridCard}
            activeOpacity={0.88}
            onPress={() => openProduct(product.id)}
          >
            <Image source={{ uri: product.image }} style={styles.gridImage} />
            {product.badge ? (
              <View style={styles.gridBadge}>
                <Text style={styles.gridBadgeText}>{product.badge}</Text>
              </View>
            ) : null}
            <View style={styles.gridContent}>
              <Text style={styles.gridName} numberOfLines={2}>
                {product.title}
              </Text>
              <Text style={styles.gridCategory}>{product.category}</Text>
              <View style={styles.gridFooter}>
                <Text style={styles.gridPrice}>
                  {product.price.toLocaleString("vi-VN")}đ
                </Text>
                <TouchableOpacity
                  style={styles.gridAddButton}
                  activeOpacity={0.8}
                  onPress={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <Ionicons name="add" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf8",
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLabel: {
    fontSize: 13,
    color: "#8f7a76",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2d1d1c",
  },
  cartButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#f8ece8",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    right: -2,
    top: -2,
    backgroundColor: "#d97777",
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#f5e1dc",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#2d1d1c",
  },
  categoryRow: {
    paddingBottom: 10,
    paddingRight: 10,
  },
  categoryChip: {
    backgroundColor: "#f8efee",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: "#f6d6d1",
  },
  categoryText: {
    color: "#5d4c4a",
    fontSize: 13,
    fontWeight: "700",
  },
  categoryTextActive: {
    color: "#2d1d1c",
  },
  gridWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  stateBox: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 28,
  },
  stateText: {
    color: "#6f5b58",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#d97777",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryText: {
    color: "#fff",
    fontWeight: "700",
  },
  gridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f4e7e3",
    shadowColor: "#d3b2ad",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 2,
  },
  gridImage: {
    width: "100%",
    height: 150,
  },
  gridBadge: {
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "#f7d7c8",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 999,
  },
  gridBadgeText: {
    fontSize: 9,
    color: "#7d3b31",
    fontWeight: "700",
  },
  gridContent: {
    padding: 10,
  },
  gridName: {
    color: "#2d1d1c",
    fontSize: 14,
    fontWeight: "700",
    minHeight: 35,
  },
  gridCategory: {
    fontSize: 11,
    color: "#8e6c67",
    marginTop: 4,
  },
  gridFooter: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridPrice: {
    fontWeight: "800",
    color: "#d76767",
    fontSize: 15,
  },
  gridAddButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#d97777",
    alignItems: "center",
    justifyContent: "center",
  },
});
