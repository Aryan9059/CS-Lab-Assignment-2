export interface Product {
  id: string;
  name: string;
  price: number; // in ₹
  category: string;
  image: string; // relative path under /public, e.g. "/images/products/1.jpg"
  description: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Earthen Diya Set",
    price: 499,
    category: "Diyas",
    image: "/images/products/diya.jpg",
    description:
      "Hand-crafted clay diyas made by local artisans. Each diya is uniquely shaped and ready to be filled with oil and a cotton wick. Set of 12.",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Rangoli Color Kit",
    price: 749,
    category: "Rangoli",
    image: "/images/products/rangoli.webp",
    description:
      "Vibrant 12-color rangoli powder kit with stencils included. Create stunning floor patterns for your Diwali celebrations.",
    badge: "Popular",
  },
  {
    id: "3",
    name: "Sparkler Pack",
    price: 299,
    category: "Fireworks",
    image: "/images/products/sparkles.jpg",
    description:
      "Safe and beautiful gold sparklers, pack of 20. Perfect for family celebrations and memorable photographs.",
  },
  {
    id: "4",
    name: "Festive Sweet Hamper",
    price: 1999,
    category: "Sweets",
    image: "/images/products/sweet.webp",
    description:
      "Assorted premium kaju katli, ladoo, and barfi in a beautifully decorated gift box. A perfect Diwali treat.",
    badge: "Gift Worthy",
  },
  {
    id: "5",
    name: "Golden Lantern",
    price: 899,
    category: "Decor",
    image: "/images/products/lantern.webp",
    description:
      "Elegant decorative hanging lantern in gold finish. Lights up your home with a warm festive glow.",
  },
  {
    id: "6",
    name: "Puja Thali Set",
    price: 1249,
    category: "Puja",
    image: "/images/products/puja.webp",
    description:
      "Brass puja thali set with diya holder, incense stick holder, bell, and kumkum container. Ready for your pooja.",
    badge: "Artisan Made",
  },
  {
    id: "7",
    name: "Ethnic Kurta",
    price: 2499,
    category: "Cloths",
    image: "/images/products/kurta.jpeg",
    description:
      "Premium cotton kurta with intricate block-print border work. Available in rich festive colours — celebrate in style.",
  },
  {
    id: "8",
    name: "Diwali Gift Hamper",
    price: 3499,
    category: "Gifts",
    image: "/images/products/gift.webp",
    description:
      "Premium Diwali gift box packed with dry fruits, sweets, a diya set, and a scented candle. Spread the joy of the festival.",
    badge: "Top Pick",
  },
];

export const categories = [
  { label: "Diyas" },
  { label: "Rangoli" },
  { label: "Fireworks" },
  { label: "Sweets" },
  { label: "Lanterns" },
  { label: "Puja" },
  { label: "Cloths" },
  { label: "Gifts" },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
