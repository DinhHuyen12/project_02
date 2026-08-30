import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { Product } from "@/constants/shop-data";
import { fetchProducts } from "@/services/products-api";

type ProductsContextValue = {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchProducts(controller.signal)
      .then(setProducts)
      .catch((requestError: unknown) => {
        if ((requestError as { name?: string }).name !== "AbortError") {
          setError("Không thể tải sản phẩm. Hãy kiểm tra kết nối mạng.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  const refresh = useCallback(() => setReloadKey((value) => value + 1), []);
  const categories = useMemo(
    () => ["Tất cả", ...new Set(products.map((product) => product.category))],
    [products],
  );
  const value = useMemo(
    () => ({ products, categories, loading, error, refresh }),
    [products, categories, loading, error, refresh],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("useProducts must be used within ProductsProvider");
  return context;
}
