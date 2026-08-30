import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useCart } from "@/context/cart-context";
import { useProducts } from "@/context/products-context";

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    productId?: string;
    quantity?: string;
  }>();
  const { cart, totalPrice, clearCart } = useCart();
  const { products } = useProducts();

  const productId = Number(params.productId ?? cart[0]?.id ?? 0);
  const quantity = Number(params.quantity ?? cart[0]?.quantity ?? 1);

  const selectedProduct = useMemo(
    () => products.find((item) => item.id === productId) ?? cart[0],
    [productId, cart, products],
  );

  const cartItems =
    cart.length > 0
      ? cart
      : selectedProduct
        ? [{ ...selectedProduct, quantity }]
        : [];

  const total = useMemo(() => {
    return totalPrice + 30000;
  }, [totalPrice]);

  const handlePlaceOrder = () => {
    clearCart();
    router.push("/");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#2d1d1c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Địa chỉ giao hàng</Text>
        <Text style={styles.cardText}>Trần Thị Lan</Text>
        <Text style={styles.cardText}>Số 18, Nguyễn Văn Cừ, Hà Nội</Text>
        <Text style={styles.cardText}>0987 654 321</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sản phẩm</Text>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.productRow}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productMeta}>Số lượng: {item.quantity}</Text>
              <Text style={styles.productMeta}>Danh mục: {item.category}</Text>
            </View>
            <Text style={styles.productPrice}>
              {(item.price * item.quantity).toLocaleString("vi-VN")}đ
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tóm tắt thanh toán</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tạm tính</Text>
          <Text style={styles.summaryValue}>
            {totalPrice.toLocaleString("vi-VN")}đ
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
          <Text style={styles.summaryValue}>30.000đ</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tổng cộng</Text>
          <Text style={styles.summaryTotal}>
            {total.toLocaleString("vi-VN")}đ
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePlaceOrder}>
        <Text style={styles.payButtonText}>Đặt hàng</Text>
      </TouchableOpacity>
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
    paddingBottom: 40,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#f7eae8",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2d1d1c",
  },
  placeholder: {
    width: 42,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#f5e3df",
  },
  cardTitle: {
    color: "#2d1d1c",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  cardText: {
    color: "#5d4c4a",
    fontSize: 14,
    lineHeight: 22,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 14,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    marginRight: 8,
  },
  productName: {
    color: "#2d1d1c",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  productMeta: {
    color: "#8d6d69",
    fontSize: 12,
    marginBottom: 2,
  },
  productPrice: {
    color: "#d76767",
    fontSize: 16,
    fontWeight: "800",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: {
    color: "#5d4c4a",
    fontSize: 14,
  },
  summaryValue: {
    color: "#2d1d1c",
    fontWeight: "600",
  },
  summaryTotal: {
    color: "#d76767",
    fontWeight: "800",
    fontSize: 18,
  },
  payButton: {
    marginTop: 10,
    backgroundColor: "#d97777",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
