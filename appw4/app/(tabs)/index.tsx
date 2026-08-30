import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
import { useProducts } from "../../context/products-context";

export default function HomeScreen() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { products, categories } = useProducts();
  const featuredProducts = products.slice(0, 5);
  const bestSellingProducts = products.slice(1, 5);

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
      <View style={styles.headerWrap}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Xin chào</Text>
            <Text style={styles.shopName}>Memory Gift</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
              <Ionicons name="search-outline" size={20} color="#3b2f2f" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
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
        </View>
      </View>

      <LinearGradient
        colors={["#f9d8d8", "#f6e9d8", "#f3e8ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <View style={styles.bannerTextWrap}>
          <Text style={styles.bannerLabel}>Ưu đãi đặc biệt</Text>
          <Text style={styles.bannerTitle}>
            Quà lưu niệm đáng yêu cho mọi khoảnh khắc
          </Text>
          <Text style={styles.bannerSub}>Giảm đến 30% cho bộ quà tặng mới</Text>
          <TouchableOpacity style={styles.bannerButton} activeOpacity={0.9}>
            <Text style={styles.bannerButtonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
          }}
          style={styles.bannerImage}
        />
      </LinearGradient>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <Text style={styles.sectionLink}>Xem tất cả</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryChip,
              index === 0 && styles.categoryChipActive,
            ]}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.categoryText,
                index === 0 && styles.categoryTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
        <Text style={styles.sectionLink}>Xem thêm</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productRow}
      >
        {featuredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            activeOpacity={0.85}
            onPress={() => openProduct(product.id)}
            style={styles.productCard}
          >
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            {product.badge ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{product.badge}</Text>
              </View>
            ) : null}
            <View style={styles.productContent}>
              <Text style={styles.productName}>{product.title}</Text>
              <Text style={styles.productDescription} numberOfLines={2}>
                {product.description}
              </Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>
                  {product.price.toLocaleString("vi-VN")}đ
                </Text>
                <TouchableOpacity
                  style={styles.addButton}
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
      </ScrollView>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Sản phẩm bán chạy</Text>
        <Text style={styles.sectionLink}>Top 4</Text>
      </View>
      <View style={styles.bestsellerWrap}>
        {bestSellingProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.bestsellerItem}
            activeOpacity={0.8}
            onPress={() => openProduct(product.id)}
          >
            <Image
              source={{ uri: product.image }}
              style={styles.bestsellerImage}
            />
            <View style={styles.bestsellerInfo}>
              <Text style={styles.bestsellerName} numberOfLines={2}>
                {product.title}
              </Text>
              <Text style={styles.bestsellerPrice}>
                {product.price.toLocaleString("vi-VN")}đ
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.promoBanner}>
        <View>
          <Text style={styles.promoTag}>Flash sale</Text>
          <Text style={styles.promoTitle}>Giảm 25% cho đơn hàng từ 500k</Text>
        </View>
        <TouchableOpacity style={styles.promoButton} activeOpacity={0.9}>
          <Text style={styles.promoButtonText}>Dùng ngay</Text>
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
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },
  headerWrap: {
    marginBottom: 18,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 13,
    color: "#8f7a76",
    marginBottom: 2,
  },
  shopName: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2d1d1c",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconButton: {
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
  banner: {
    borderRadius: 26,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    shadowColor: "#d8b8b8",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 4,
  },
  bannerTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  bannerLabel: {
    fontSize: 12,
    color: "#8f5a4e",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2d1d1c",
    lineHeight: 30,
    marginTop: 8,
  },
  bannerSub: {
    marginTop: 8,
    fontSize: 13,
    color: "#5d4b49",
  },
  bannerButton: {
    marginTop: 14,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  bannerButtonText: {
    color: "#2d1d1c",
    fontWeight: "700",
  },
  bannerImage: {
    width: 110,
    height: 110,
    borderRadius: 24,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#2d1d1c",
  },
  sectionLink: {
    fontSize: 12,
    color: "#9a6d6d",
    fontWeight: "600",
  },
  categoryRow: {
    paddingVertical: 6,
    paddingRight: 8,
  },
  categoryChip: {
    backgroundColor: "#f7f1ee",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: "#f6d6d1",
  },
  categoryText: {
    color: "#5b4c4c",
    fontSize: 13,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#2d1d1c",
  },
  productRow: {
    paddingRight: 10,
    paddingBottom: 8,
  },
  productCard: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#f3e7e2",
    shadowColor: "#d7b3af",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 170,
  },
  badge: {
    position: "absolute",
    left: 12,
    top: 12,
    backgroundColor: "#f7d7c8",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  badgeText: {
    color: "#7d3b31",
    fontSize: 10,
    fontWeight: "700",
  },
  productContent: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2a2020",
  },
  productDescription: {
    marginTop: 6,
    color: "#7e6666",
    fontSize: 12,
    lineHeight: 18,
  },
  productFooter: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 17,
    fontWeight: "800",
    color: "#d76767",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#d97777",
    alignItems: "center",
    justifyContent: "center",
  },
  bestsellerWrap: {
    gap: 12,
    marginBottom: 18,
  },
  bestsellerItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f4e3df",
  },
  bestsellerImage: {
    width: 82,
    height: 82,
    borderRadius: 16,
    marginRight: 12,
  },
  bestsellerInfo: {
    flex: 1,
  },
  bestsellerName: {
    fontSize: 15,
    color: "#2d1d1c",
    fontWeight: "700",
    marginBottom: 4,
  },
  bestsellerPrice: {
    color: "#d76767",
    fontSize: 15,
    fontWeight: "800",
  },
  promoBanner: {
    backgroundColor: "#f9dfe3",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoTag: {
    color: "#975c5f",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  promoTitle: {
    color: "#2d1d1c",
    fontSize: 18,
    fontWeight: "700",
  },
  promoButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  promoButtonText: {
    color: "#2d1d1c",
    fontWeight: "700",
  },
});
