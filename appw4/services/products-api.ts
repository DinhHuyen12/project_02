import { Product } from "@/constants/shop-data";

type DummyJsonProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images?: string[];
  discountPercentage?: number;
};
type DummyJsonResponse = { products: DummyJsonProduct[] };

const PRODUCTS_ENDPOINT = "https://dummyjson.com/products?limit=30";
const categoryLabels: Record<string, string> = {
  beauty: "Làm đẹp",
  fragrances: "Nước hoa",
  furniture: "Nội thất",
  groceries: "Tạp hóa",
  "home-decoration": "Trang trí nhà",
  laptops: "Laptop",
  smartphones: "Điện thoại",
  tablets: "Máy tính bảng",
  tops: "Thời trang nữ",
  "womens-bags": "Túi nữ",
  "womens-dresses": "Váy nữ",
  "womens-jewellery": "Trang sức nữ",
  "womens-shoes": "Giày nữ",
  "womens-watches": "Đồng hồ nữ",
};

function toProduct(item: DummyJsonProduct): Product {
  const discount = item.discountPercentage ?? 0;
  return {
    id: item.id,
    title: item.title,
    category: categoryLabels[item.category] ?? item.category,
    description: item.description,
    price: Math.round(item.price * 25000),
    oldPrice: Math.round((item.price * 25000) / (1 - discount / 100)),
    rating: item.rating,
    image: item.images?.[0] ?? item.thumbnail,
    badge: item.stock < 10 ? "Sắp hết" : undefined,
    colors: ["#f4d8cf", "#d7e8f7", "#e5dfc9"],
    sizes: ["Tiêu chuẩn"],
    material: "Thông tin đang được cập nhật",
    stock: item.stock,
  };
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_ENDPOINT, { signal });
  if (!response.ok)
    throw new Error(`Không thể tải sản phẩm (${response.status}).`);
  const data = (await response.json()) as DummyJsonResponse;
  return data.products.map(toProduct);
}
