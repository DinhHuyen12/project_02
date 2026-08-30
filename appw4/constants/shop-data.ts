export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  oldPrice: number;
  rating: number;
  image: string;
  badge?: string;
  colors: string[];
  sizes: string[];
  material: string;
  stock: number;
};
