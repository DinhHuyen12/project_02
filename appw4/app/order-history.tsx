import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type OrderStatus = "Tất cả" | "Đang xử lý" | "Đang giao" | "Đã giao";
type Order = {
  id: string;
  date: string;
  status: Exclude<OrderStatus, "Tất cả">;
  items: string;
  total: number;
};
const orders: Order[] = [
  {
    id: "MG-240826",
    date: "26/08/2026",
    status: "Đang giao",
    items: "Khung ảnh kỷ niệm và nến thơm",
    total: 428000,
  },
  {
    id: "MG-180826",
    date: "18/08/2026",
    status: "Đã giao",
    items: "Móc khóa đôi, thiệp viết tay",
    total: 219000,
  },
  {
    id: "MG-030826",
    date: "03/08/2026",
    status: "Đã giao",
    items: "Hộp quà sinh nhật đặc biệt",
    total: 599000,
  },
  {
    id: "MG-290826",
    date: "29/08/2026",
    status: "Đang xử lý",
    items: "Album ảnh mini",
    total: 185000,
  },
];
const statusColors: Record<
  Order["status"],
  { background: string; text: string }
> = {
  "Đang xử lý": { background: "#fff2d9", text: "#a66a16" },
  "Đang giao": { background: "#e5f1ff", text: "#3973a8" },
  "Đã giao": { background: "#e3f3eb", text: "#458568" },
};

export default function OrderHistoryScreen() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("Tất cả");
  const filters: OrderStatus[] = [
    "Tất cả",
    "Đang xử lý",
    "Đang giao",
    "Đã giao",
  ];
  const filteredOrders =
    selectedStatus === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#2d1d1c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử đơn hàng</Text>
        <View style={styles.headerPlaceholder} />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filter,
                selectedStatus === filter && styles.filterActive,
              ]}
              onPress={() => setSelectedStatus(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedStatus === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {filteredOrders.map((order) => {
          const colors = statusColors[order.status];
          return (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderTop}>
                <View>
                  <Text style={styles.orderId}>#{order.id}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <View
                  style={[
                    styles.status,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <Text style={[styles.statusText, { color: colors.text }]}>
                    {order.status}
                  </Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.orderInfo}>
                <View style={styles.receiptIcon}>
                  <Ionicons name="gift-outline" size={21} color="#d76767" />
                </View>
                <View style={styles.itemCopy}>
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {order.items}
                  </Text>
                  <Text style={styles.itemHint}>Xem chi tiết sản phẩm</Text>
                </View>
                <Text style={styles.total}>
                  {order.total.toLocaleString("vi-VN")}đ
                </Text>
              </View>
              <TouchableOpacity style={styles.detailButton} activeOpacity={0.8}>
                <Text style={styles.detailText}>Xem chi tiết</Text>
                <Ionicons name="chevron-forward" size={16} color="#d76767" />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf8" },
  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#f7eae8",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#2d1d1c", fontSize: 21, fontWeight: "800" },
  headerPlaceholder: { width: 42 },
  content: { paddingHorizontal: 18, paddingBottom: 30 },
  filters: { gap: 8, paddingVertical: 10, marginBottom: 8 },
  filter: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#f8ece8",
  },
  filterActive: { backgroundColor: "#d97777" },
  filterText: { color: "#806c67", fontSize: 13, fontWeight: "700" },
  filterTextActive: { color: "#fff" },
  orderCard: {
    backgroundColor: "#fff",
    borderColor: "#f2dfda",
    borderWidth: 1,
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
  },
  orderTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  orderId: {
    color: "#3b2f2f",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 4,
  },
  orderDate: { color: "#9a8580", fontSize: 12 },
  status: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: "800" },
  divider: { height: 1, backgroundColor: "#f5e9e5", marginVertical: 13 },
  orderInfo: { flexDirection: "row", alignItems: "center" },
  receiptIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#fff1ed",
    alignItems: "center",
    justifyContent: "center",
  },
  itemCopy: { flex: 1, marginHorizontal: 11 },
  itemTitle: {
    color: "#3b2f2f",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19,
  },
  itemHint: { color: "#a18b85", fontSize: 11, marginTop: 3 },
  total: { color: "#d76767", fontSize: 14, fontWeight: "800" },
  detailButton: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  detailText: {
    color: "#d76767",
    fontSize: 13,
    fontWeight: "800",
    marginRight: 3,
  },
});
