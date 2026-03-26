// src/data/menu.ts
// No image imports here — images referenced as /products/*.jpg
// Copy your 6 product photos into: public/products/
// Filenames must match exactly:
//   cucumber-pineapple-spinach.jpg
//   cucumber-pineapple-mint.jpg
//   orange-carrot.jpg
//   watermelon-mango.jpg
//   watermelon.jpg
//   watermelon-beetroot.jpg

export interface Flavour {
  id: string;
  name: string;
  seasonal: boolean;
  custom: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  image: string; // path from /public e.g. /products/watermelon.jpg
  flavours: Flavour[];
}

export interface Package {
  id: string;
  size: string;
  label: string;
  description: string;
  price: number;
  bottleCount: number | null;
  maxFlavours: number | null;
  badge: string | null;
  featured: boolean;
  image: string; // path from /public
}

export const PACKAGES: Package[] = [
  {
    id: "pkg-350",
    size: "350ml",
    label: "350ml · Set of 20",
    description: "Up to 3 flavours per set",
    price: 700,
    bottleCount: 20,
    maxFlavours: 3,
    badge: "Most Popular",
    featured: true,
    image: "/products/cucumber-pineapple-spinach.jpg",
  },
  {
    id: "pkg-250",
    size: "250ml",
    label: "250ml · Set of 20",
    description: "Up to 2 flavours per set",
    price: 500,
    bottleCount: 20,
    maxFlavours: 2,
    badge: null,
    featured: false,
    image: "/products/watermelon.jpg",
  },
  {
    id: "pkg-event",
    size: "5kg",
    label: "5kg Event Bag",
    description: "Bulk servings for events",
    price: 500,
    bottleCount: null,
    maxFlavours: null,
    badge: "Events",
    featured: false,
    image: "/products/orange-carrot.jpg",
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "cucumber",
    name: "Cucumber",
    color: "#7CB87C",
    image: "/products/cucumber-pineapple-spinach.jpg",
    flavours: [
      { id: "cuc-plain",   name: "Cucumber",                         seasonal: false, custom: false },
      { id: "cuc-app-spi", name: "Cucumber Apple Spinach",           seasonal: false, custom: false },
      { id: "cuc-app-lim", name: "Cucumber Apple Lime",              seasonal: false, custom: false },
      { id: "cuc-pin-min", name: "Cucumber Pineapple Mint",          seasonal: false, custom: false },
      { id: "cuc-pin-spi", name: "Cucumber Pineapple Spinach",       seasonal: false, custom: false },
      { id: "cuc-app-kal", name: "Cucumber Apple Kale",              seasonal: false, custom: false },
    ],
  },
  {
    id: "watermelon",
    name: "Watermelon",
    color: "#E05A6A",
    image: "/products/watermelon.jpg",
    flavours: [
      { id: "wat-plain", name: "Watermelon",          seasonal: false, custom: false },
      { id: "wat-man",   name: "Watermelon Mango",    seasonal: false, custom: false },
      { id: "wat-bee",   name: "Watermelon Beetroot", seasonal: false, custom: false },
    ],
  },
  {
    id: "pineapple",
    name: "Pineapple",
    color: "#D4A017",
    image: "/products/cucumber-pineapple-mint.jpg",
    flavours: [
      { id: "pin-gin",     name: "Pineapple (+/- Ginger)",           seasonal: false, custom: false },
      { id: "pin-pas",     name: "Pineapple Passion Fruit",          seasonal: true,  custom: false },
      { id: "pin-cuc-min", name: "Cucumber Pineapple Mint",          seasonal: false, custom: false },
      { id: "pin-car",     name: "Carrot Pineapple",                 seasonal: false, custom: false },
      { id: "pin-paw",     name: "Pawpaw Pineapple",                 seasonal: true,  custom: false },
      { id: "pin-ora-tur", name: "Pineapple Orange Turmeric Pepper", seasonal: false, custom: true  },
      { id: "pin-wat",     name: "Pineapple Watermelon",             seasonal: false, custom: false },
    ],
  },
  {
    id: "mango",
    name: "Mango",
    color: "#E07820",
    image: "/products/watermelon-mango.jpg",
    flavours: [
      { id: "man-plain", name: "Mango",          seasonal: true,  custom: false },
      { id: "man-bee",   name: "Mango Beetroot", seasonal: false, custom: false },
    ],
  },
  {
    id: "orange",
    name: "Orange",
    color: "#E06820",
    image: "/products/orange-carrot.jpg",
    flavours: [
      { id: "ora-plain", name: "Orange",         seasonal: false, custom: false },
      { id: "ora-bee",   name: "Orange Beetroot", seasonal: false, custom: false },
    ],
  },
  {
    id: "beetroot",
    name: "Beetroot",
    color: "#8B2252",
    image: "/products/watermelon-beetroot.jpg",
    flavours: [
      { id: "bee-plain",   name: "Beetroot",             seasonal: false, custom: false },
      { id: "bee-gin",     name: "Beetroot Ginger",       seasonal: false, custom: false },
      { id: "bee-app-car", name: "Apple Beetroot Carrot", seasonal: false, custom: true  },
    ],
  },
  {
    id: "carrot",
    name: "Carrot",
    color: "#D4621A",
    image: "/products/orange-carrot.jpg",
    flavours: [
      { id: "car-plain", name: "Carrot",          seasonal: false, custom: true  },
      { id: "car-ora",   name: "Carrot Orange",   seasonal: false, custom: false },
      { id: "car-pin",   name: "Carrot Pineapple", seasonal: false, custom: false },
    ],
  },
];

export const WHATSAPP_NUMBER = "233547000817";
export const SHEET_URL = "https://script.google.com/macros/s/AKfycbzFF1od7S5tFGIVCkFnWHmAkBtffruzcZtw7X2PkpsdZyvi8tW1ktnNy1Knqle9PEWT/exec";