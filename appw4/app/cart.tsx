import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useCart } from "@/context/cart-context";

export default function CartScreen() {
  const router = useRouter();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#2d1d1c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {cart.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống.</Text>
          </View>
        ) : (
          cart.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />

              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemMeta}>{item.category}</Text>
                <Text style={styles.itemPrice}>
                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                </Text>
              </View>

              <View style={styles.itemControls}>
                <View style={styles.quantityBox}>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Ionicons name="remove" size={16} color="#2d1d1c" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Ionicons name="add" size={16} color="#2d1d1c" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash-outline" size={20} color="#d97777" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tổng tiền</Text>
          <Text style={styles.summaryValue}>
            {totalPrice.toLocaleString("vi-VN")}đ
          </Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf8",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
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
    fontSize: 22,
    fontWeight: "800",
    color: "#2d1d1c",
  },
  placeholder: {
    width: 42,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    gap: 12,
  },
  emptyBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f5e3df",
  },
  emptyText: {
    color: "#5d4c4a",
    fontSize: 15,
    fontWeight: "600",
  },
  itemCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#f5e3df",
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    color: "#2d1d1c",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  itemMeta: {
    color: "#8c6f69",
    fontSize: 12,
    marginBottom: 8,
  },
  itemPrice: {
    color: "#d76767",
    fontSize: 16,
    fontWeight: "800",
  },
  itemControls: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8efee",
    borderRadius: 12,
    paddingHorizontal: 6,
  },
  quantityButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    minWidth: 22,
    textAlign: "center",
    color: "#2d1d1c",
    fontWeight: "700",
  },
  summaryBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 18,
    borderTopWidth: 1,
    borderColor: "#f5e3df",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  summaryLabel: {
    color: "#5d4c4a",
    fontSize: 15,
    fontWeight: "600",
  },
  summaryValue: {
    color: "#2d1d1c",
    fontSize: 22,
    fontWeight: "800",
  },
  checkoutButton: {
    backgroundColor: "#d97777",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
