import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AccountScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Tài khoản</Text>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.name}>Minh Anh</Text>
          <Text style={styles.email}>minhanh@example.com</Text>
        </View>
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => router.push("../profile")}
          accessibilityLabel="Chỉnh sửa hồ sơ"
        >
          <Ionicons name="create-outline" size={20} color="#d76767" />
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Đơn hàng</Text>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("../order-history")}
        activeOpacity={0.8}
      >
        <View style={[styles.menuIcon, { backgroundColor: "#fce9e4" }]}>
          <Ionicons name="receipt-outline" size={21} color="#d76767" />
        </View>
        <View style={styles.menuCopy}>
          <Text style={styles.menuTitle}>Lịch sử đơn hàng</Text>
          <Text style={styles.menuSubtitle}>
            Theo dõi và xem lại đơn đã mua
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={19} color="#ad9690" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Cá nhân</Text>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("../profile")}
        activeOpacity={0.8}
      >
        <View style={[styles.menuIcon, { backgroundColor: "#eee9ff" }]}>
          <Ionicons name="person-outline" size={21} color="#7567c8" />
        </View>
        <View style={styles.menuCopy}>
          <Text style={styles.menuTitle}>Hồ sơ cá nhân</Text>
          <Text style={styles.menuSubtitle}>
            Thông tin liên hệ và địa chỉ nhận hàng
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={19} color="#ad9690" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.supportItem} activeOpacity={0.8}>
        <Ionicons name="headset-outline" size={21} color="#5b8c81" />
        <Text style={styles.supportText}>Cần hỗ trợ? Liên hệ Memory Gift</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf8" },
  content: { padding: 20, paddingTop: 24, paddingBottom: 36 },
  eyebrow: { color: "#8f7a76", fontSize: 13, marginBottom: 5 },
  profileHeader: {
    backgroundColor: "#fff",
    borderColor: "#f2dfda",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 28,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#f2b6aa",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 25, fontWeight: "800" },
  profileCopy: { flex: 1, marginLeft: 13 },
  name: { color: "#2d1d1c", fontSize: 20, fontWeight: "800", marginBottom: 4 },
  email: { color: "#8f7a76", fontSize: 13 },
  editIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#fff2ee",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    color: "#2d1d1c",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 10,
    marginTop: 2,
  },
  menuItem: {
    backgroundColor: "#fff",
    borderColor: "#f2dfda",
    borderWidth: 1,
    borderRadius: 17,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  menuCopy: { flex: 1, marginHorizontal: 12 },
  menuTitle: {
    color: "#3b2f2f",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  menuSubtitle: { color: "#98827d", fontSize: 12 },
  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  supportText: {
    color: "#5b8c81",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 10,
  },
});
