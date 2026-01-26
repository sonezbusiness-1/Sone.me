// Product Data - All products stored in JavaScript objects
const PRODUCTS = [
  // SMARTPHONES
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    category: "phones",
    brand: "Apple",
    price: 1199,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop",
    specs: {
      ram: "12GB",
      storage: "512GB",
      camera: "48MP + 12MP + 12MP",
      battery: "4685 mAh",
      display: "6.9\" Super Retina XDR"
    },
    rating: 4.8,
    reviews: 2543
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    category: "phones",
    brand: "Samsung",
    price: 1299,
    image: "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=cropfit=crop",
    specs: {
      ram: "16GB",
      storage: "1TB",
      camera: "200MP + 50MP + 10MP + 10MP",
      battery: "5000 mAh",
      display: "6.8\" Dynamic AMOLED 2X"
    },
    rating: 4.9,
    reviews: 3102
  },
  {
    id: 3,
    name: "Google Pixel 9 Pro",
    category: "phones",
    brand: "Google",
    price: 999,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop",
    specs: {
      ram: "16GB",
      storage: "256GB",
      camera: "50MP + 42MP + 10MP",
      battery: "5050 mAh",
      display: "6.3\" OLED"
    },
    rating: 4.7,
    reviews: 1876
  },
  {
    id: 4,
    name: "OnePlus 13",
    category: "phones",
    brand: "OnePlus",
    price: 799,
    image: "https://images.unsplash.com/photo-1606933248051-5ce98adc6ecf?w=500https://images.unsplash.com/photo-1606933248051-5ce98adc6ecf?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1606933248051-5ce98adc6ecf?w=500&h=500&fit=cropfit=crop",
    specs: {
      ram: "12GB",
      storage: "256GB",
      camera: "50MP + 50MP + 8MP",
      battery: "6000 mAh",
      display: "6.7\" AMOLED"
    },
    rating: 4.6,
    reviews: 1245
  },
  {
    id: 5,
    name: "Xiaomi 15 Ultra",
    category: "phones",
    brand: "Xiaomi",
    price: 749,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    specs: {
      ram: "12GB",
      storage: "512GB",
      camera: "50MP + 50MP + 50MP + 50MP",
      battery: "5910 mAh",
      display: "6.73\" AMOLED"
    },
    rating: 4.5,
    reviews: 987
  },

  // LAPTOPS
  {
    id: 6,
    name: "MacBook Pro 16\" M4 Max",
    category: "laptops",
    brand: "Apple",
    price: 3499,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
    specs: {
      processor: "Apple M4 Max",
      ram: "36GB",
      storage: "1TB SSD",
      display: "16\" Liquid Retina XDR",
      battery: "Up to 33 hours"
    },
    rating: 4.9,
    reviews: 4521
  },
  {
    id: 7,
    name: "Dell XPS 15",
    category: "laptops",
    brand: "Dell",
    price: 2199,
    image: "https://images.unsplash.com/photo-1588872657840-790ff3bde08c?w=500https://images.unsplash.com/photo-1588872657840-790ff3bde08c?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1588872657840-790ff3bde08c?w=500&h=500&fit=cropfit=crop",
    specs: {
      processor: "Intel Core i9-14900HX",
      ram: "32GB",
      storage: "1TB SSD",
      display: "15.6\" OLED",
      battery: "Up to 13 hours"
    },
    rating: 4.7,
    reviews: 2834
  },
  {
    id: 8,
    name: "Lenovo ThinkPad X1 Carbon",
    category: "laptops",
    brand: "Lenovo",
    price: 1699,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=500https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=500&h=500&fit=cropfit=crop",
    specs: {
      processor: "Intel Core i7-14700K",
      ram: "16GB",
      storage: "512GB SSD",
      display: "14\" OLED",
      battery: "Up to 15 hours"
    },
    rating: 4.6,
    reviews: 1923
  },
  {
    id: 9,
    name: "ASUS ROG Zephyrus G16",
    category: "laptops",
    brand: "ASUS",
    price: 2899,
    image: "https://images.unsplash.com/photo-1588872657840-790ff3bde08c?w=500https://images.unsplash.com/photo-1603302576837-37894b6baf30?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1603302576837-37894b6baf30?w=500&h=500&fit=cropfit=crop",
    specs: {
      processor: "Intel Core i9-14900HX",
      ram: "32GB",
      storage: "2TB SSD",
      display: "16\" OLED 240Hz",
      battery: "Up to 10 hours"
    },
    rating: 4.8,
    reviews: 2156
  },

  // TABLETS
  {
    id: 10,
    name: "iPad Pro 12.9\" M4",
    category: "tablets",
    brand: "Apple",
    price: 1199,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
    specs: {
      processor: "Apple M4",
      ram: "16GB",
      storage: "512GB",
      display: "12.9\" Liquid Retina XDR",
      battery: "Up to 10 hours"
    },
    rating: 4.8,
    reviews: 3421
  },
  {
    id: 11,
    name: "Samsung Galaxy Tab S10 Ultra",
    category: "tablets",
    brand: "Samsung",
    price: 999,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
    specs: {
      processor: "Snapdragon 8 Gen 3 Leading Version",
      ram: "12GB",
      storage: "256GB",
      display: "14.6\" Dynamic AMOLED 2X",
      battery: "11200 mAh"
    },
    rating: 4.7,
    reviews: 2145
  },
  {
    id: 12,
    name: "Microsoft Surface Pro 11",
    category: "tablets",
    brand: "Microsoft",
    price: 1299,
    image: "https://images.unsplash.com/photo-1585864299869-592a1ee14c2d?w=500https://images.unsplash.com/photo-1585864299869-592a1ee14c2d?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1585864299869-592a1ee14c2d?w=500&h=500&fit=cropfit=crop",
    specs: {
      processor: "Snapdragon X Plus",
      ram: "16GB",
      storage: "512GB",
      display: "13\" PixelSense",
      battery: "Up to 14 hours"
    },
    rating: 4.6,
    reviews: 1876
  },

  // SMARTWATCHES
  {
    id: 13,
    name: "Apple Watch Series 10",
    category: "wearables",
    brand: "Apple",
    price: 429,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    specs: {
      display: "1.69\" Retina LTPO OLED",
      processor: "S10 SiP",
      storage: "32GB",
      battery: "Up to 18 hours",
      water_resistance: "50m"
    },
    rating: 4.8,
    reviews: 5234
  },
  {
    id: 14,
    name: "Samsung Galaxy Watch 7 Ultra",
    category: "wearables",
    brand: "Samsung",
    price: 399,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    specs: {
      display: "1.5\" AMOLED",
      processor: "Exynos W1000",
      storage: "16GB",
      battery: "Up to 4 days",
      water_resistance: "100m"
    },
    rating: 4.7,
    reviews: 3876
  },
  {
    id: 15,
    name: "Garmin Epix Gen 2",
    category: "wearables",
    brand: "Garmin",
    price: 599,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    specs: {
      display: "1.3\" AMOLED",
      processor: "Garmin",
      storage: "32GB",
      battery: "Up to 16 days",
      water_resistance: "100m"
    },
    rating: 4.9,
    reviews: 2145
  },

  // EARBUDS
  {
    id: 16,
    name: "Apple AirPods Pro 3",
    category: "accessories",
    brand: "Apple",
    price: 249,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    specs: {
      driver: "Custom Apple driver",
      battery: "Up to 6 hours",
      case_battery: "Up to 30 hours",
      noise_cancellation: "Active Noise Cancellation",
      water_resistance: "IP54"
    },
    rating: 4.8,
    reviews: 6234
  },
  {
    id: 17,
    name: "Samsung Galaxy Buds 3 Pro",
    category: "accessories",
    brand: "Samsung",
    price: 229,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    specs: {
      driver: "Dual-way speaker system",
      battery: "Up to 6 hours",
      case_battery: "Up to 26 hours",
      noise_cancellation: "Active Noise Cancellation",
      water_resistance: "IPX7"
    },
    rating: 4.7,
    reviews: 4521
  },
  {
    id: 18,
    name: "Sony WF-1000XM5",
    category: "accessories",
    brand: "Sony",
    price: 299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    specs: {
      driver: "8mm driver",
      battery: "Up to 8 hours",
      case_battery: "Up to 24 hours",
      noise_cancellation: "Industry-leading ANC",
      water_resistance: "IPX4"
    },
    rating: 4.9,
    reviews: 5876
  },

  // ACCESSORIES
  {
    id: 19,
    name: "Apple Magic Keyboard",
    category: "accessories",
    brand: "Apple",
    price: 149,
    image: "https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=500https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=500&h=500&fit=cropfit=crop",
    specs: {
      type: "Wireless Keyboard",
      battery: "Up to 1 month",
      connectivity: "Bluetooth",
      layout: "Full-size",
      material: "Aluminum"
    },
    rating: 4.6,
    reviews: 2341
  },
  {
    id: 20,
    name: "Logitech MX Master 3S",
    category: "accessories",
    brand: "Logitech",
    price: 99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    specs: {
      type: "Wireless Mouse",
      battery: "Up to 70 days",
      dpi: "8K DPI",
      connectivity: "Bluetooth + USB",
      buttons: "8 programmable buttons"
    },
    rating: 4.8,
    reviews: 3876
  },
  {
    id: 21,
    name: "Anker PowerCore 65W",
    category: "accessories",
    brand: "Anker",
    price: 79,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    specs: {
      capacity: "20000mAh",
      output: "65W",
      ports: "2x USB-C + 1x USB-A",
      weight: "338g",
      fast_charging: "Yes"
    },
    rating: 4.7,
    reviews: 4234
  },
  {
    id: 22,
    name: "Belkin Premium USB-C Cable",
    category: "accessories",
    brand: "Belkin",
    price: 29,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
    specs: {
      length: "2 meters",
      material: "Braided Nylon",
      data_transfer: "480 Mbps",
      power_delivery: "240W",
      durability: "10,000+ bend cycles"
    },
    rating: 4.5,
    reviews: 1876
  },
  {
    id: 23,
    name: "Spigen Tough Armor Case",
    category: "accessories",
    brand: "Spigen",
    price: 19,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop",
    specs: {
      material: "TPU + Polycarbonate",
      drop_protection: "Up to 12ft",
      compatibility: "iPhone 16 Pro Max",
      color: "Black",
      weight: "45g"
    },
    rating: 4.6,
    reviews: 2145
  }
];

// Categories configuration
const CATEGORIES = [
  { id: "phones", name: "Phones", icon: "📱" },
  { id: "laptops", name: "Laptops", icon: "💻" },
  { id: "tablets", name: "Tablets", icon: "📲" },
  { id: "wearables", name: "Wearables", icon: "⌚" },
  { id: "accessories", name: "Accessories", icon: "🎧" }
];

// Brands configuration
const BRANDS = [
  "Apple",
  "Samsung",
  "Google",
  "OnePlus",
  "Xiaomi",
  "Dell",
  "Lenovo",
  "ASUS",
  "Microsoft",
  "Garmin",
  "Sony",
  "Logitech",
  "Anker",
  "Belkin",
  "Spigen"
];

// Price ranges for filtering
const PRICE_RANGES = [
  { min: 0, max: 100, label: "Under $100" },
  { min: 100, max: 500, label: "$100 - $500" },
  { min: 500, max: 1000, label: "$500 - $1,000" },
  { min: 1000, max: 2000, label: "$1,000 - $2,000" },
  { min: 2000, max: Infinity, label: "$2,000+" }
];
