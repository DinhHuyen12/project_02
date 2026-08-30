import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCart } from "@/context/cart-context";
import { useProducts } from "../context/products-context";

export default function ProductDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ productId?: string }>();
  const { addToCart } = useCart();
  const { products, loading, error, refresh } = useProducts();

  const product = useMemo(
    () => products.find((item) => item.id === Number(params.productId)),
    [params.productId, products],
  );

  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator color="#d97777" />
        <Text style={styles.emptyText}>Đang tải sản phẩm...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error ?? "Không tìm thấy sản phẩm."}
        </Text>
        {error ? (
          <TouchableOpacity style={styles.primaryButton} onPress={refresh}>
            <Text style={styles.primaryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.primaryButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const oldPrice = product.oldPrice;
  const rating = product.rating;
  const colors = product.colors;
  const sizes = product.sizes;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push({
      pathname: "/checkout",
      params: { productId: String(product.id), quantity: String(quantity) },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={22} color="#2d1d1c" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="heart-outline" size={22} color="#2d1d1c" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.infoBox}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge ?? "Mới"}</Text>
          </View>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={14} color="#f7b500" />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {product.price.toLocaleString("vi-VN")}đ
          </Text>
          <Text style={styles.oldPrice}>
            {oldPrice.toLocaleString("vi-VN")}đ
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Mô tả</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.sectionTitle}>Màu sắc</Text>
        <View style={styles.optionRow}>
          {colors.map((color, index) => (
            <View
              key={index}
              style={[styles.colorSwatch, { backgroundColor: color }]}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Kích thước</Text>
        <View style={styles.optionRow}>
          {sizes.map((size) => (
            <View key={size} style={styles.sizePill}>
              <Text style={styles.sizeText}>{size}</Text>
            </View>
          ))}
        </View>

        <View style={styles.metaRow}>
          <View>
            <Text style={styles.metaLabel}>Chất liệu</Text>
            <Text style={styles.metaValue}>{product.material}</Text>
          </View>
          <View>
            <Text style={styles.metaLabel}>Tồn kho</Text>
            <Text style={styles.metaValue}>{product.stock} sản phẩm</Text>
          </View>
        </View>

        <View style={styles.quantityRow}>
          <Text style={styles.sectionTitle}>Số lượng</Text>
          <View style={styles.quantityBox}>
            <TouchableOpacity
              onPress={() => setQuantity((value) => Math.max(1, value - 1))}
              style={styles.quantityButton}
            >
              <Ionicons name="remove" size={18} color="#2d1d1c" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity((value) => value + 1)}
              style={styles.quantityButton}
            >
              <Ionicons name="add" size={18} color="#2d1d1c" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.secondaryButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={handleBuyNow}>
          <Text style={styles.primaryButtonText}>Mua ngay</Text>
        </TouchableOpacity>
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
    padding: 18,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#f7eae8",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 28,
    marginBottom: 18,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: "#f5e3df",
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#f9d7c9",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: "#7d3b31",
    fontSize: 11,
    fontWeight: "700",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff7db",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  ratingText: {
    color: "#5f4d19",
    fontWeight: "700",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2d1d1c",
  },
  category: {
    fontSize: 13,
    color: "#8d6d69",
    marginTop: 6,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    marginBottom: 18,
  },
  price: {
    color: "#d76767",
    fontSize: 28,
    fontWeight: "800",
  },
  oldPrice: {
    color: "#b7a5a2",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "line-through",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2d1d1c",
    marginBottom: 8,
  },
  description: {
    color: "#614d4b",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  colorSwatch: {
    width: 28,
    height: 28,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  sizePill: {
    backgroundColor: "#f8efee",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  sizeText: {
    color: "#2d1d1c",
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f1f0",
    padding: 14,
    borderRadius: 16,
    marginBottom: 18,
  },
  metaLabel: {
    color: "#8b706d",
    fontSize: 12,
    marginBottom: 4,
  },
  metaValue: {
    color: "#2d1d1c",
    fontWeight: "700",
    fontSize: 13,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8efee",
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    minWidth: 30,
    textAlign: "center",
    fontWeight: "700",
    color: "#2d1d1c",
  },
  footer: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
    flexDirection: "row",
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#f9e8e4",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#2d1d1c",
    fontWeight: "700",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#d97777",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffaf8",
    padding: 24,
  },
  emptyText: {
    color: "#2d1d1c",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
});
